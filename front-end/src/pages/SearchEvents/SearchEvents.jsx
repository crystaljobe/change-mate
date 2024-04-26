import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './SearchEvents.css'; // Assuming you add a CSS file for extra styles
import { getEventDetailsAllFilters, getEventDetailsNoEventType, getEventDetailsAllFiltersExactDate, getEventDetailsNoLocation, getEventDetailsNoSearchTermSearchType, getEventDetailsLocExactDateSearchTermSearchType, getEventDetailsLocEventTypeSearchTermSearchType, getEventDetailsDateRangeSearchTermSearchType, getEventDetailsLocDateRange, getEventDetailsLocExactDateEventType, getEventDetailsLocSearchTermSearchType, getEventDetailsDateRangeEventType, getEventDetailsExactDateSearchTermSearchType, getEventDetailsEventTypeSearchTermSearchType, getEventDetailsLocExactDate, getEventDetailsLocEventType, getEventDetailsDateRange, getEventDetailsExactDateEventType, getEventDetailsSearchTermSearchType, getEventDetailsLocation, getEventDetailsExactDate, getEventDetailsEventType } from "../../utilities/EventUtilities";
import EventCard from "../../components/EventCard";

function SearchEvents() {
    const [searchType, setSearchType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDateStart, setSearchDateStart] = useState('');
    const [searchDateEnd, setSearchDateEnd] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [searchEventType, setSearchEventType] = useState('');
    const [searchEvents, setSearchEvents] = useState([]);
    const [eventsPopular, setEventsPopular] = useState([]);
    // TODO: once we have a spot on our events to indicate whether volunteers are needed, we can add functionality to sort searchEvents into searchEventsVolNeed
    const [eventsVolNeed, setEventsVolNeed] = useState([]);
    const [eventsAdditional, setEventsAdditional] = useState([]);
    console.log('searchEvents', searchEvents)


    // Handles changing the searchType; SearchType is needed so that when the form submits it knows which API call to do
    const handleSearchTypeChange = (selectedType) => {
        setSearchType(selectedType);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchLocation && searchLocation.length > 0 && // Location
            searchDateStart && searchDateStart.length > 0 && // Start date
            searchDateEnd && searchDateEnd.length > 0 && // End date
            searchEventType && searchEventType.length > 0 && // Event type
            searchType && searchType.length > 0 && // Search type
            searchTerm && searchTerm.length > 0) { // Search term

            // All inputs
            const events = await getEventDetailsAllFilters(searchLocation, searchDateStart, searchDateEnd, searchEventType, searchType, searchTerm)
            setSearchEvents(events)

        } else if (searchLocation && searchLocation.length > 0 && // Location
            searchDateStart && searchDateStart.length > 0 && // Start date
            searchDateEnd && searchDateEnd.length > 0 && // End date
            searchType && searchType.length > 0 && // Search type
            searchTerm && searchTerm.length > 0) { // Search term

            //  All inputs except Event type
            const events = await getEventDetailsNoEventType(searchLocation, searchDateStart, searchDateEnd, searchType, searchTerm)
            setSearchEvents(events)

        } else if (searchLocation && searchLocation.length > 0 && // Location
            searchDateStart && searchDateStart.length > 0 && // Start date
            searchEventType && searchEventType.length > 0 && // Event type
            searchType && searchType.length > 0 && // Search type
            searchTerm && searchTerm.length > 0) { // Search term

            // All inputs exact date
            const events = await getEventDetailsAllFiltersExactDate(searchLocation, searchDateStart, searchEventType, searchType, searchTerm)
            setSearchEvents(events)

        } else if (searchDateStart && searchDateStart.length > 0 && // Start date
            searchDateEnd && searchDateEnd.length > 0 && // End date
            searchEventType && searchEventType.length > 0 && // Event type
            searchType && searchType.length > 0 && // Search type
            searchTerm && searchTerm.length > 0) { // Search term

            // All inputs except Location
            const events = await getEventDetailsNoLocation(searchDateStart, searchDateEnd, searchEventType, searchType, searchTerm)
            setSearchEvents(events)
            
        } else if (searchLocation && searchLocation.length > 0 && // Location
            searchDateStart && searchDateStart.length > 0 && //Start Date
            searchDateEnd && searchDateEnd.length > 0 && // End Date
            searchEventType && searchEventType.length > 0 ) { // Event type

            // All inputs except Search term and Search type
            const events = await getEventDetailsNoSearchTermSearchType(searchLocation, searchDateStart, searchDateEnd, searchEventType)
            setSearchEvents(events)

        } else if (searchLocation && searchLocation.length > 0 && // Location
            searchDateStart && searchDateStart.length > 0 && // Start date
            searchType && searchType.length > 0 && // Search type
            searchTerm && searchTerm.length > 0) { // Search term

            // Location + Start date + Search type + Search term
            const events = await getEventDetailsLocExactDateSearchTermSearchType(searchLocation, searchDateStart, searchType, searchTerm)
            setSearchEvents(events)
            
        } else if (searchLocation && searchLocation.length > 0 && // Location
            searchEventType && searchEventType.length > 0 && // Event type
            searchType && searchType.length > 0 && // Search type
            searchTerm && searchTerm.length > 0) { // Search term

            // Location + Event type + Search type + Search term
            const events = await getEventDetailsLocEventTypeSearchTermSearchType(searchLocation, searchEventType, searchType, searchTerm)
            setSearchEvents(events)

        } else if (searchDateStart && searchDateStart.length > 0 && // Start date
            searchDateEnd && searchDateEnd.length > 0 && // End date
            searchType && searchType.length > 0 && // Search type
            searchTerm && searchTerm.length > 0) { // Search term

            // Start date + End date + Search type + Search term
            const events = await getEventDetailsDateRangeSearchTermSearchType(searchDateStart, searchDateEnd, searchType, searchTerm)
            setSearchEvents(events)
            
        } else if (searchLocation && searchLocation.length > 0 && // Location
            searchDateStart && searchDateStart.length > 0 && // Start date
            searchDateEnd && searchDateEnd.length > 0) { // End date

            // Location + Start date + End date
            const events = await getEventDetailsLocDateRange(searchLocation, searchDateStart, searchDateEnd)
            setSearchEvents(events)

        } else if (searchLocation && searchLocation.length > 0 && // Location
            searchDateStart && searchDateStart.length > 0 && // Start date
            searchEventType && searchEventType.length > 0) { // Event type

            // Location + Start date + Event type
            const events = await getEventDetailsLocExactDateEventType(searchLocation, searchDateStart, searchEventType)
            setSearchEvents(events)

        } else if (searchLocation && searchLocation.length > 0 && // Location
            searchType && searchType.length > 0 && // Search type
            searchTerm && searchTerm.length > 0) { // Search term

            // Location + Search type + Search term
            const events = await getEventDetailsLocSearchTermSearchType(searchLocation, searchType, searchTerm)
            setSearchEvents(events)

        } else if (searchDateStart && searchDateStart.length > 0 && // Start date
            searchDateEnd && searchDateEnd.length > 0 && // End date
            searchEventType && searchEventType.length > 0) { // Event type

            // Start date + End date + Event type
            const events = await getEventDetailsDateRangeEventType(searchDateStart, searchDateEnd, searchEventType)
            setSearchEvents(events)

        } else if (searchDateStart && searchDateStart.length > 0 && // Start date
            searchType && searchType.length > 0 && // Search type
            searchTerm && searchTerm.length > 0) { // Search term

            // Start date + Search type + Search term
            const events = await getEventDetailsExactDateSearchTermSearchType(searchDateStart, searchType, searchTerm)
            setSearchEvents(events)

        } else if (searchEventType && searchEventType.length > 0 && // Event type
            searchType && searchType.length > 0 && // Search type
            searchTerm && searchTerm.length > 0) { // Search term

            // Event type + Search type + Search term
            const events = await getEventDetailsEventTypeSearchTermSearchType(searchEventType, searchType, searchTerm)
            setSearchEvents(events)

        } else if (searchLocation && searchLocation.length > 0 && // Location
            searchDateStart && searchDateStart.length > 0) { // Start date

            // Location + Start date
            const events = await getEventDetailsLocExactDate(searchLocation, searchDateStart)
            setSearchEvents(events)

        } else if (searchLocation && searchLocation.length > 0 && // Location
            searchEventType && searchEventType.length > 0) { // Event type

            // Location + Event type
            const events = await getEventDetailsLocEventType(searchLocation, searchEventType)
            setSearchEvents(events)

        } else if (searchDateStart && searchDateStart.length > 0 && // Start date
            searchDateEnd && searchDateEnd.length > 0) { // End date

            // Start date + End date
            const events = await getEventDetailsDateRange(searchDateStart, searchDateEnd)
            setSearchEvents(events)

        } else if (searchDateStart && searchDateStart.length > 0 && // Start date
            searchEventType && searchEventType.length > 0) { // Event type

            // Start date + Event type
            const events = await getEventDetailsExactDateEventType(searchDateStart, searchEventType)
            setSearchEvents(events)


        } else if (searchType && searchType.length > 0 && // Search type
            searchTerm && searchTerm.length > 0) { // Search term

            // Search type + Search term
            const events = await getEventDetailsSearchTermSearchType(searchType, searchTerm)
            setSearchEvents(events)

        } else if (searchLocation && searchLocation.length > 0) { // Location

            // Location 
            const events = await getEventDetailsLocation(searchLocation)
            setSearchEvents(events)

        } else if (searchDateStart && searchDateStart.length > 0) { // Start date

            // Start date
            const events = await getEventDetailsExactDate(searchDateStart)
            setSearchEvents(events)

        } else if (searchEventType && searchEventType.length > 0) { // Event type

            // Event type
            const events = await getEventDetailsEventType(searchEventType)
            setSearchEvents(events)
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

    const sortVolunteerEvents = async (searchEvents) => {
        const needVol = []
        // Loops through the searchEvents to determine if event needs volunteers
        for (const event of searchEvents) {
            if (event.volunteers_needed) {
                needVol.push(event)
            }
        }
        // Sets events that need volunteers to the eventsVolNeed
        setEventsVolNeed(needVol)
       
    }

    useEffect(() => {
        sortPopularEvents(searchEvents)
        sortVolunteerEvents(searchEvents)
    }, [searchEvents]);

    return (
        <div className="search-events">
            {/* Search Bar */}
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col">
                        <h2>Search Events</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="City, State" onChange={(e) => setSearchLocation(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Date(s):</Form.Label>{' '}
                                <Form.Text id="passwordHelpBlock" muted>
                                    Enter one date for exact match, or two dates for a range
                                </Form.Text>
                                <div className="d-flex">
                                        <div>
                                            <Form.Control type="date" onChange={(e) => setSearchDateStart(e.target.value)} />
                                        </div>
                                        <div>
                                            <Form.Control type="date" onChange={(e) => setSearchDateEnd(e.target.value)} />
                                        </div>
                                    </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>In-Person/Virtual?</Form.Label>
                                <div className="mb-3">
                                    <Form.Check
                                        inline
                                        label="In-Person"
                                        name="group1"
                                        type='radio'
                                        value='In-person'
                                        onChange={(e) => setSearchEventType(e.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        label="Virtual"
                                        name="group1"
                                        type='radio'
                                        value='Virtual'
                                        onChange={(e) => setSearchEventType(e.target.value)}
                                    />
                                </div>
                            </Form.Group>
                            <InputGroup className="mb-3">
                                <DropdownButton
                                    variant="outline-secondary"
                                    title={searchType ? `Search by ${searchType}` : "Search Type"}
                                    id="input-group-dropdown-1"
                                >
                                    <Dropdown.Item onClick={() => handleSearchTypeChange('keyword')}>Keyword</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSearchTypeChange('category')}>Category</Dropdown.Item>
                                </DropdownButton>
                                <Form.Control aria-label="Text input with dropdown button" onChange={(e) => setSearchTerm(e.target.value)} />
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
            
            {/* Events Needing Volunteers */}
            <div className="container-fluid mt-5 mb-5">
                <h2 className="mb-3 text-center">Events Needing Volunteers</h2>
                <div className="row row-cols-1 row-cols-lg-4 g-4">
                    {/* Renders no events needing volunteers message if no events needing volunteers returned; If events needing volunteers is returned, maps through eventsVolNeed rendering an EventCard for each*/}
                    {eventsVolNeed.length == 0 ?
                        <h5 style={{fontStyle:'italic'}}>No events needing volunteers found matching your search parameters</h5> :
                        eventsVolNeed.map(e => 
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
