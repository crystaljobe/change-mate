import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './SearchEvents.css'; // Assuming you add a CSS file for extra styles
import { getEventDetailsSearch } from "../../utilities/EventUtilities";
import { getUserProfile } from '../../utilities/UserProfileUtilities'
import EventCard from "../../components/EventCard";
import { getCountries, getStates, getCities } from "../../utilities/CountryStateCityUtilities";

function SearchEvents() {
    const myOutletContextObj = useOutletContext();
    const { user, userProfile } = myOutletContextObj;
    const [userLocations, setUserLocations] = useState(userProfile.coordinates);
    const [searchType, setSearchType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDateStart, setSearchDateStart] = useState('');
    const [searchDateEnd, setSearchDateEnd] = useState('');
    const [searchEventType, setSearchEventType] = useState('');
    const [searchEvents, setSearchEvents] = useState([]);
    const [eventsPopular, setEventsPopular] = useState([]);
    // TODO: once we have a spot on our events to indicate whether volunteers are needed, we can add functionality to sort searchEvents into searchEventsVolNeed
    const [eventsVolNeed, setEventsVolNeed] = useState([]);
    const [eventsAdditional, setEventsAdditional] = useState([]);
    const [searchCoordinates, setSearchCoordinates] = useState([]);
    const [searchDistance, setSearchDistance] = useState(25);

    

    // Handles changing the searchType; SearchType is needed so that when the form submits it knows which API call to do
    const handleSearchTypeChange = (selectedType) => {
        setSearchType(selectedType);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        // Creates an object with all the search parameters
        const allData = {
            "type": searchEventType, 
            "start_date": searchDateStart, 
            "end_date": searchDateEnd, 
            "coordinates": searchCoordinates,
            "distance": searchDistance,
            searchType: searchTerm
        }
        // Calls the getEventDetailsSearch function from EventUtilities to get the events that match the search parameters
        getEventDetailsSearch(allData)
            .then((response) => {
                setSearchEvents(response)
            })
    }


    const getLocalEvents = async () => {
        const allData = {
            "coordinates": userLocations
        }
        getEventDetailsSearch(allData)
            .then((response) => {
                setSearchEvents(response)
            })
    }

    useEffect(() => {
        getLocalEvents()
    }, [userLocations]);
    


    // Sorts the events returned from the search into eventsPopular
    const sortPopularEvents = async (searchEvents) => {
        const popEvents = []
        const unpopEvents = []
        // Loops through the searchEvents to determine if event is popular or not and sorts them into their respective categories
        for (const event of searchEvents) {
            // TODO: DEPLOYMENT - Currently for development purposes an event is popular if more than 1 user or more is attending; Before deployment we must chnage this to a more reasonable real-world threshhold
            if (event.num_users_attending > 1) {
                popEvents.push(event)
            } else {
                unpopEvents.push(event)
            }
            
        }
        // Sets popular events to eventsPopular and not popular events to eventsAdditional
        setEventsPopular(popEvents)
        setEventsAdditional(unpopEvents)
    }

    // Not funtional yet; Awaiting backend to add volunteers_needed to the model
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
    console.log(searchEvents)
    return (
        <div className="search-events">
            {/* Search Bar */}
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col">
                        <h2>Search Events</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formLocationSearch">
                                <Form.Label>
                                    Country
                                    <br />
                                    <input
                                    name="country"
                                    placeholder="Country"
                                    type="text"
                                    list="countries-list" // Use the list attribute to associate with the datalist
                                    size={40}
                                    onChange={(e) => setCountryAdd(e.target.value)}
                                    />
                                    {/* Create a datalist with options from apiCountries */}
                                    <datalist id="countries-list">
                                    {apiCountries.map((country, index) => (
                                        <option key={index} value={country.name} />
                                    ))}
                                    </datalist>
                                </Form.Label>
                                <Form.Label>
                                    Region/State
                                    <br />
                                    <input
                                    name="state"
                                    placeholder=" Region/State"
                                    type="text"
                                    list="states-list" // Use the list attribute to associate with the datalist
                                    size={40}
                                    value={stateAdd[1]} // Display only the state name
                                    onChange={(e) => {
                                        const selectedState = apiStates.find(state => state.name === e.target.value);
                                        setStateAdd(selectedState ? [selectedState.id, selectedState.name] : []);
                                    }}
                                    />
                                    {/* Create a datalist with options from apiStates */}
                                    <datalist id="states-list">
                                    {apiStates.map((state, index) => (
                                        <option key={index} value={state.name} />
                                    ))}
                                    </datalist>
                                </Form.Label>
                                <Form.Label>
                                    City
                                    <br />
                                    <input
                                    name="city"
                                    placeholder="City"
                                    type="text"
                                    list="cities-list" // Use the list attribute to associate with the datalist
                                    size={40}
                                    onChange={(e) => setCityAdd(e.target.value)}
                                    />
                                    {/* Create a datalist with options from apiCities */}
                                    <datalist id="cities-list">
                                    {apiCities.map((city, index) => (
                                        <option key={index} value={city.name} />
                                    ))}
                                    </datalist>
                                </Form.Label>
                            
                                <Button variant="info" onClick={() => handleAddLocation()}> 
                                Add Location
                                </Button>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Date(s):</Form.Label>{' '}
                                <Form.Text  muted>
                                    Enter first date for exact match, or both dates for a range
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