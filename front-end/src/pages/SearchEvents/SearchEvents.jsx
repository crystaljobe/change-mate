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
    const [searchEvents, setSearchEvents] = useState([]);
    const [eventsPopular, setEventsPopular] = useState([]);
    // TODO: once we have a spot on our events to indicate whether volunteers are needed, we can add functionality to sort searchEvents into searchEventsVolNeed
    const [eventsVolNeed, setEventsVolNeed] = useState([]);

    const handleSearchTypeChange = (selectedType) => {
        setSearchType(selectedType);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchType == 'category') {
            // TODO: for category, search term must be by the category id currently; Backend needs to be fixed to allow searching by category name
            const eventsByCat = await getEventDetailsByCategory(searchTerm)
            setSearchEvents(eventsByCat)
        } else if (searchType == 'type') {
            const eventsByType = await getEventDetailsByType(searchTerm)
            console.log('eventsByType', eventsByType)
            setSearchEvents(eventsByType)
        } else if (searchType == 'date') {
            const eventsByDate = await getEventDetailsByDate(searchTerm)
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

    const sortSearchEvents = async (searchEvents) => {
        const popEvents = []
        for (const event of searchEvents) {
            if (event.users_attending == 0) {
                popEvents.push(event)
            } 
            // TODO: add another if statement for sorting events where volunteers are needed
        }
        setEventsPopular(popEvents)
    }

    useEffect(() => {
        sortSearchEvents(searchEvents)
      }, [searchEvents]);

    console.log('searchType', searchType)
    console.log('searchTerm', searchTerm)
    console.log('searchEvents', searchEvents)
    console.log('searchEventsPopular', eventsPopular)

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
                                    <Dropdown.Item onClick={() => handleSearchTypeChange('category')}>Category</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSearchTypeChange('type')}>Type</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSearchTypeChange('date')}>Date</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSearchTypeChange('location')}>Location</Dropdown.Item>
                                </DropdownButton>
                                {searchType === 'type' ? (
                                    <Form.Select aria-label="Search type select" onChange={(e) => setSearchTerm(e.target.value)}>
                                        <option>Select a type</option>
                                        <option value="In-person">In-Person</option>
                                        <option value="Virtual">Virtual</option>
                                    </Form.Select>
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
        </div>
    );
}

export default SearchEvents;
