import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './SearchEvents.css'; // Assuming you add a CSS file for extra styles
import { getEventDetailsByCategory, getEventDetailsByType, getEventDetailsByDate, getEventDetailsByLocation } from "../../utilities/EventUtilities";
import EventCard from "../../components/EventCard";

function SearchEvents() {
    const [searchType, setSearchType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDateStart, setSearchDateStart] = useState('');
    const [searchDateEnd, setSearchDateEnd] = useState('');
    const [searchEvents, setSearchEvents] = useState([]);
    const [eventsPopular, setEventsPopular] = useState([]);
    // TODO: once we have a spot on our events to indicate whether volunteers are needed, we can add functionality to sort searchEvents into searchEventsVolNeed
    const [eventsVolNeed, setEventsVolNeed] = useState([]);
    const [eventsAdditional, setEventsAdditional] = useState([]);


    // Handles changing the searchType; SearchType is needed so that when the form submits it knows which API call to do
    const handleSearchTypeChange = (selectedType) => {
        setSearchType(selectedType);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Based on searchType call correct search API function
        if (searchType == 'keyword') {
            // TODO: functionality for keyword search
        } else if (searchType == 'category') {
            const eventsByCat = await getEventDetailsByCategory(searchTerm)
            setSearchEvents(eventsByCat)
        } else if (searchType == 'type') {
            const eventsByType = await getEventDetailsByType(searchTerm)
            console.log('eventsByType', eventsByType)
            setSearchEvents(eventsByType)
        } else if (searchType == 'date') {
            const eventsByDate = await getEventDetailsByDate(searchDateStart, searchDateEnd)
            setSearchEvents(eventsByDate)
        } else if (searchType == 'location') {
            // TODO: neither event_venue nor event_venue_address work with the backend to return an event by location, but we probably don't want to search by something so specific anyways. Maybe backend can add a general location to the events model? For example the city.
            const eventsByLoc = await getEventDetailsByLocation(searchTerm)
            console.log('eventsByLoc', eventsByLoc)
            setSearchEvents(eventsByDate)
        } else {
            return null
        }
    }

    // Sorts the events returned from the search into eventsPopular
    const sortPopularEvents = async (searchEvents) => {
        const popEvents = []
        const unpopEvents = []
        // Loops through the searchEvents to determine if event is popular or not and sorts them into their respective categories
        for (const event of searchEvents) {
            // TODO: DEPLOYMENT - Currently for development purposes an event is popular if 1 user or more is attending; Before deployment we must chnage this to a more reasonable real-world threshhold
            if (event.users_attending > 0) {
                popEvents.push(event)
            } else {
                unpopEvents.push(event)
            }
            
        }
        // Sets popular events to eventsPopular and not popular events to eventsAdditional
        setEventsPopular(popEvents)
        setEventsAdditional(unpopEvents)
    }

    useEffect(() => {
        sortPopularEvents(searchEvents)
      }, [searchEvents]);

    // console.log('searchType', searchType)
    // console.log('searchTerm', searchTerm)
    // console.log('searchDateStart', searchDateStart)
    // console.log('searchDateEnd', searchDateEnd)
    // console.log('searchEvents', searchEvents)
    // console.log('searchEventsPopular', eventsPopular)

    return (
        <div className="search-events">
            {/* Search Bar */}
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col">
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <DropdownButton
                                    variant="outline-secondary"
                                    title={searchType ? `Search by ${searchType}` : "Search Type"}
                                    id="input-group-dropdown-1"
                                >
                                    <Dropdown.Item onClick={() => handleSearchTypeChange('keyword')}>Keyword</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSearchTypeChange('category')}>Category</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSearchTypeChange('type')}>Type</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSearchTypeChange('date')}>Date</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSearchTypeChange('location')}>Location</Dropdown.Item>
                                </DropdownButton>
                                {/* Conditional rendering of search box based on data type of search parameter */}
                                {searchType === 'type' ? (
                                    <Form.Select aria-label="Search type select" onChange={(e) => setSearchTerm(e.target.value)}>
                                        <option>Select a type</option>
                                        <option value="In-person">In-Person</option>
                                        <option value="Virtual">Virtual</option>
                                    </Form.Select>
                                ) : searchType === 'date' ? (
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <Form.Control type="date" onChange={(e) => setSearchDateStart(e.target.value)} />
                                        </div>
                                        <div>
                                            <Form.Control type="date" onChange={(e) => setSearchDateEnd(e.target.value)} />
                                        </div>
                                    </div>
                                ) : (
                                    <Form.Control aria-label="Text input with dropdown button" onChange={(e) => setSearchTerm(e.target.value)} />
                                )}
                                <Button variant="outline-secondary" id="button-addon2" type="submit">Search</Button>
                            </InputGroup>
                        </Form>
                    </div>
                </div>
            </div>

            {/* Popular Events */}
            <div className="container-fluid mt-5">
                <h2 className="mb-3 text-center">Popular Events</h2>
                <div className="row row-cols-1 row-cols-lg-4 g-4">
                    {/* Renders no popular events message if no popular events returned; If popular events is returned, maps through eventsPopular rendering an EventCard for each*/}
                    {eventsPopular.length == 0 ?
                        <h5 style={{fontStyle:'italic'}}>No popular events found matching your search parameters</h5> :
                        eventsPopular.map(e => 
                            <EventCard 
                                key={e.id}
                                id={e.id}
                                title={e.title}
                                image={e.event_photo}
                                description={e.description}
                            />
                    )}
                </div>
            </div>
            
            {/* TODO: make this like the popular events where it renders the CharacterCard once sorting events has the functionality to sort events that need volunteers  */}
            {/* Events Needing Volunteers */}
            <div className="container-fluid mt-5 mb-5">
                <h2 className="mb-3 text-center">Events Needing Volunteers</h2>
                <div className="row row-cols-1 row-cols-lg-4 g-4">
                    {[5, 6, 7, 8].map((event, index) => (
                        <div key={index} className="col">
                            <div className="card h-100 shadow-sm card-hover">
                                <img src={`https://picsum.photos/400/300?random=${index+4}`} className="card-img-top" alt="Event" />
                                <div className="card-body">
                                    <h5 className="card-title">Event Title {index + 4}</h5>
                                    <p className="card-text">Additional volunteers needed to help with the upcoming community efforts.</p>
                                    <a href="#" className="btn btn-warning">Volunteer</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Events */}
            <div className="container-fluid mt-5">
                <h2 className="mb-3 text-center">Additional Events</h2>
                <div className="row row-cols-1 row-cols-lg-4 g-4">
                    {/* Renders no other events message if no additional events returned; If additional events is returned, maps through eventsAdditional rendering an EventCard for each*/}
                    {eventsAdditional.length == 0 ?
                        <h5 style={{fontStyle:'italic'}}>No other events found matching your search parameters</h5> :
                        eventsAdditional.map(e => 
                            <EventCard 
                                key={e.id}
                                id={e.id}
                                title={e.title}
                                image={e.event_photo}
                                description={e.description}
                            />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchEvents;
