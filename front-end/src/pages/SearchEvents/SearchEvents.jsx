import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Form, InputGroup, Container, Row, Col, Carousel } from 'react-bootstrap';
import './SearchEvents.css';
import EventCard from "../../components/EventCard";
import DropdownComponent from "../../components/AdvancedFilterButtons";
import { getEventDetailsSearch } from "../../utilities/EventUtilities";

function SearchEvents() {
    // This holds all events initially fetched or loaded
    const [allEvents, setAllEvents] = useState([]); // This holds all events initially fetched or loaded
    // to save query parameters for sub filtering 
    const [selectedCategory, setSelectedCategory] = useState('');
    // to conditionally render advanced search buttons
    const [searchSubmitted, setSearchSubmitted] = useState(false);
    const [searchType, setSearchType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchEventType, setSearchEventType] = useState('');
    const [searchEvents, setSearchEvents] = useState([]);
    const [eventsPopular, setEventsPopular] = useState([]);
    // TODO: once we have a spot on our events to indicate whether volunteers are needed, we can add functionality to sort searchEvents into searchEventsVolNeed
    const [eventsVolNeed, setEventsVolNeed] = useState([]);
    const [eventsAdditional, setEventsAdditional] = useState([]);
    const myOutletContextObj = useOutletContext();
    const { user } = myOutletContextObj;

    // Handles changing the searchType; SearchType is needed so that when the form submits it knows which API call to do
    const handleSearchTypeChange = (selectedType) => {
        setSearchType(selectedType);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearchSubmitted(false);

        // Creates an object with all the search parameters
        const allData = {
            "type": searchEventType,
            [searchType]: searchTerm
        }
        // Calls the getEventDetailsSearch function from EventUtilities to get the events that match the search parameters
        getEventDetailsSearch(allData)
            .then((response) => {
                setSearchEvents(response)
                setSearchSubmitted(true); 
            })
    }

    const getLocalEvents = async () => {
        const allData = {
            "type": undefined,
            "start_date": undefined,
            "end_date": undefined,
            searchType: undefined
        }
        getEventDetailsSearch(allData)
            .then((response) => {
                setSearchEvents(response)
            })
    }

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

    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    const popularGroupedEvents = chunkArray(eventsPopular, 3);
    const volunteerGroupedEvents = chunkArray(eventsVolNeed, 3);
    const additionalGroupedEvents = chunkArray(eventsAdditional, 3);

    useEffect(() => {
        if (searchSubmitted && selectedCategory) {
            const filteredEvents = allEvents.filter(event => event.category === selectedCategory);
            setSearchEvents(filteredEvents);
        }
    }, [selectedCategory, searchSubmitted, allEvents]);
    
    
    return (
        <div className="search-events p-4">
            <div className="search-events-background">
                {/* This container-fluid will apply to the overall layout, allowing sections like event cards to stretch fully */}
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-10 mx-auto">
                            <h2 className="mb-4" style={{ textAlign: 'center' }}>Search Events</h2>
                            <Form onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-white rounded">
                                <Row>
                                    <Col md={4}>
                                        <InputGroup>
                                            <InputGroup.Text>Keyword</InputGroup.Text>
                                            <Form.Control aria-label="Keyword search" onChange={(e) => handleSearchTypeChange(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md={4}>
                                        <InputGroup>
                                            <InputGroup.Text>Location</InputGroup.Text>
                                            <Form.Control placeholder="State, City" list="location-list" onChange={(e) => setCountryAdd(e.target.value)} />
                                            <datalist id="location-list">
                                                {/* Assuming combined list, or you can manage separate inputs as needed
                                                {apiCountries.concat(apiStates).concat(apiCities).map((loc, index) => (
                                                    <option key={index} value={loc.name} />
                                                ))} */}
                                            </datalist>
                                        </InputGroup>
                                    </Col>
                                    <Col md={3}>
                                        <InputGroup>
                                        <InputGroup.Text>Type</InputGroup.Text>
                                        <Form.Select onChange={(e) => setSearchEventType(e.target.value)} defaultValue="In-person">
                                            <option value="In-person">In-Person</option>
                                            <option value="Virtual">Virtual</option>
                                        </Form.Select>
                                        </InputGroup>
                                    </Col>
                                    <Col md={1}>
                                        <Button variant="primary" type="submit" className="w-100">Search</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
                                
            {/* Conditionally render component W/ searchSubmitted and pass query setSelectedCategory for subquery*/}
            {searchSubmitted && <DropdownComponent onCategoryChange={setSelectedCategory} />} 

            {/* Popular Events with Carousel */}
            <div className="search-events p-4">
                <Container fluid className="mt-5">
                    <h2 className="text-center">Popular Events</h2>
                    {eventsPopular.length === 0 ? (
                        <p className="text-muted text-center">No popular events found.</p>
                    ) : (
                        <Carousel interval={null} indicators={true}>
                            {popularGroupedEvents.map((group, index) => (
                                <Carousel.Item key={index}>
                                    <Row className="justify-content-center">
                                        {group.map((event) => (
                                            <Col key={event.id} xs={12} md={4} className="d-flex align-items-stretch">
                                                <EventCard {...event} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </Container>

                <Container fluid className="mt-5">
                    <h2 className="text-center">Events Needing Volunteers</h2>
                    {eventsVolNeed.length === 0 ? (
                        <p className="text-muted text-center">No events needing volunteers found.</p>
                    ) : (
                        <Carousel interval={null} indicators={true}>
                            {volunteerGroupedEvents.map((group, index) => (
                                <Carousel.Item key={index}>
                                    <Row className="justify-content-center">
                                        {group.map((event) => (
                                            <Col key={event.id} xs={12} md={4} className="d-flex align-items-stretch">
                                                <EventCard {...event} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </Container>

                <Container fluid className="mt-5">
                    <h2 className="text-center">Additional Events</h2>
                    {eventsAdditional.length === 0 ? (
                        <p className="text-muted text-center">No other events found.</p>
                    ) : (
                        <Carousel interval={null} indicators={true}>
                            {additionalGroupedEvents.map((group, index) => (
                                <Carousel.Item key={index}>
                                    <Row className="justify-content-center">
                                        {group.map((event) => (
                                            <Col key={event.id} xs={12} md={2} className="d-flex align-items-stretch">
                                                <EventCard {...event} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </Container>
            </div>
        </div>
    );
}

export default SearchEvents;