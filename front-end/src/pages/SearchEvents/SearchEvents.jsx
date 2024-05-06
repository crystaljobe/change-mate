import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {  Form, InputGroup, Container, Row, Col, Carousel } from 'react-bootstrap';
import { Button } from '@mui/material'
import './SearchEvents.css';
import EventCard from "../../components/EventCard";
import DropdownComponent from "../../components/AdvancedFilterButtons";
import { getEventDetailsSearch } from "../../utilities/EventUtilities";
import MapboxGeocoderComponent from "../../components/MapboxGeocoderComponent";
// import EventCard from "../../components/EventCard";


function SearchEvents() {
    const { userProfileData } = useOutletContext();
    const [userCoordinates, setUserCoordinates] = useState([]);
    // Distance set to 200 by default
    const [distance, setDistance] = useState(200);

    const [searchEvents, setSearchEvents] = useState([]);
    // filteredEvents useState can be used later once we setup filtering on front end
    // const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchSubmitted, setSearchSubmitted] = useState(false);

    // Basic search parameters
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCoordinates, setSearchCoordinates] = useState([]);
    const [searchEventType, setSearchEventType] = useState('');

    // Filter parameters
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    
    // Categories for sorting search results into
    const [eventsPopular, setEventsPopular] = useState([]);
    // TODO: once we have a spot on our events to indicate whether volunteers are needed, we can add functionality to sort searchEvents into searchEventsVolNeed
    const [eventsVolNeed, setEventsVolNeed] = useState([]);
    const [eventsAdditional, setEventsAdditional] = useState([]);
    const [cardsPerPage, setCardsPerPage] = useState(4);

    useEffect(() => {
        const updateCardsPerPage = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 3000) {
                setCardsPerPage(8);
            } else if (screenWidth >= 2700) {
                setCardsPerPage(7);
            } else if (screenWidth >= 2300) {
                setCardsPerPage(6);
            } else if (screenWidth >= 2000) {
                setCardsPerPage(5);
            } else if (screenWidth >= 1700) {
                setCardsPerPage(4);
            } else if (screenWidth >= 1400) {
                setCardsPerPage(3);
            }else if (screenWidth >= 992) {
                setCardsPerPage(3);
            } else if (screenWidth >= 768) {
                setCardsPerPage(2);
            } else {
                setCardsPerPage(1);
            }
        };

        updateCardsPerPage();
        window.addEventListener('resize', updateCardsPerPage);
        return () => {
            window.removeEventListener('resize', updateCardsPerPage);
        };
    }, []);

    // Gets the user coordinates for automatic fetching of events in user's area
    const getUserCoordinates = async () => {
        setUserCoordinates(userProfileData.coordinates)
    }

    useEffect(() => {
        getUserCoordinates()
    }, [userProfileData]);

    // Gets events on render for events local to the user
    const getLocalEvents = async () => {
        if (userCoordinates && userCoordinates.length > 0){
            const allData = {
                "coordinates": userCoordinates,
                "distance": distance/60
            }
            
            // Calls the getEventDetailsSearch function from EventUtilities to get the events that match the user's location
            getEventDetailsSearch(allData)
                .then((response) => {
                    setSearchEvents(response)
                })
        }
    }

    useEffect(() => {
        getLocalEvents()
    }, [userCoordinates]);
    
    // Handles searching for events
    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault(); // Prevent form submission if event object is provided
        }
        // Creates an object with all the search parameters
        const allData = {
            "type": searchEventType, 
            "coordinates": searchCoordinates,
            "distance": distance/60,
            "keyword": searchTerm,
            "start_date": selectedStartDate, 
            "end_date": selectedEndDate, 
            "category": selectedCategory
        }

        // Calls the getEventDetailsSearch function from EventUtilities to get the events that match the search parameters
        getEventDetailsSearch(allData)
            .then((response) => {
                setSearchEvents(response)
                // Renders advanced search options
                setSearchSubmitted(true)
            })
    }

    useEffect(() => {
        sortPopularEvents(searchEvents)
        sortVolunteerEvents(searchEvents)
    }, [searchEvents]);

    // Sorts the events returned from the search into eventsPopular
    const sortPopularEvents = async (events) => {
        const popEvents = []
        const unpopEvents = []
        // Loops through the searchEvents to determine if event is popular or not and sorts them into their respective categories
        for (const event of events) {
            // TODO: DEPLOYMENT - Currently for development purposes an event is popular if more than 1 user is attending; Before deployment we must chnage this to a more reasonable real-world threshhold
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
    // Not funtional yet; Awaiting backend to add volunteers_needed to the model serializer
    const sortVolunteerEvents = async (events) => {
        const needVol = []

        // Loops through the searchEvents to determine if event needs volunteers
        for (const event of events) {
            if (event.volunteer_spots_remaining > 0) {
                needVol.push(event)
            }
        }
        // Sets events that need volunteers to the eventsVolNeed
        setEventsVolNeed(needVol)
    }

    // Chunks results of popular events, volunteer events and additional events into groups of three for rendering
    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    // const popularGroupedEvents = chunkArray(eventsPopular, 3);
    const volunteerGroupedEvents = chunkArray(eventsVolNeed, cardsPerPage);
    const additionalGroupedEvents = chunkArray(eventsAdditional, cardsPerPage);

    // SAVE THIS! Can't do this now, but this function is almost set up to filter search events result on front end to reduce api calls; we need the event to have lat and lon included in the serializer to be able to do though so we can calculate the radius on the front end.
    //     useEffect(() => {
    //     // Function to check if an event matches the filter criteria
    //     const matchesFilterCriteria = (event) => {
    //         // Check if the event matches the selected category
    //         const matchesCategory = selectedCategory ? event.category.category === selectedCategory : true;

    //         // Check if the event falls within the selected start and end dates
    //         const startDateCondition = selectedStartDate ? event.startDate >= selectedStartDate : true;
    //         const endDateCondition = selectedEndDate ? event.startDate <= selectedEndDate : true;

    //         // TODO: add locationCondition once searching by location radius works

    //         return matchesCategory && startDateCondition && endDateCondition;
    //     };

    //     // Apply filters to searchEvents based on category, start date, and end date
    //     const filteredEventsData = searchEvents.filter(event => matchesFilterCriteria(event));
        
    //     // Set the filtered events
    //     setFilteredEvents(filteredEventsData);
    // }, [selectedCategory, selectedStartDate, selectedEndDate]);

      // useEffect(() => {
    //     sortPopularEvents(filteredEvents)
    //     sortVolunteerEvents(filteredEvents)
    // }, [filteredEvents]);

    
    
    return (
        <div className="search-events p-4">
            <div className="search-events-background">
                {/* This container-fluid will apply to the overall layout, allowing sections like event cards to stretch fully */}
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-10 mx-auto">
                        <Form onSubmit={handleSubmit} className="shadow p-3 mb-5 rounded" style={{backgroundColor:"#93eeef", filter: "drop-shadow(#22054c -1rem 1rem 10px)"}}>
    <Container>
        <Row className="justify-content-center"> {/* Center the content horizontally */}
            <Col xs={12} md={4}>
                <InputGroup>
                    <InputGroup.Text>Search Events</InputGroup.Text>
                    <Form.Control placeholder="Search" aria-label="Keyword search" onChange={(e) => setSearchTerm(e.target.value)} />
                </InputGroup>
            </Col>
            <Col xs={12} md={4}>
                <InputGroup className="d-flex flex-nowrap">
                    <InputGroup.Text>Location</InputGroup.Text>
                    <MapboxGeocoderComponent
                        setCoords={setSearchCoordinates}
                    />
                </InputGroup>
            </Col>
            <Col xs={12} md={4}>
                <InputGroup>
                    <InputGroup.Text>Type</InputGroup.Text>
                    <Form.Select onChange={(e) => setSearchEventType(e.target.value)} defaultValue="In-person" >
                        <option value="In-person">In-Person</option>
                        <option value="Virtual">Virtual</option>
                    </Form.Select>
                </InputGroup>
            </Col>
        </Row>
        <Row className="justify-content-center mt-3"> {/* Center the button horizontally */}
            <Col xs={9} md={4}>
                <Button
                    className="text-center"
                    type="submit"
                    style={{
                        width: "100%", // Make the button full width
                        paddingLeft: "0",
                        paddingRight: "0",
                    }}
                    size="small"
                    sx={{
                        borderColor: "primary.dark", // Default border color
                        backgroundColor: "white",
                        color: "black",
                        border: "2px solid",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: "secondary.dark",
                            color: "white",
                        },
                    }}>
                    Search Events
                </Button>
            </Col>
        </Row>
    </Container>
</Form>
                        </div>
                    </div>
                </div>
            </div>
                                
            {/* Conditionally render component W/ searchSubmitted and pass query setSelectedCategory for subquery*/}
            {searchSubmitted && <DropdownComponent distance={distance} selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} selectedCategory={selectedCategory} handleSubmit={handleSubmit} setSelectedCategory={setSelectedCategory} setSelectedStartDate={setSelectedStartDate} setSelectedEndDate={setSelectedEndDate} setDistance={setDistance} />} 


            <div className="search-events p-4">                
                
                {/* Events with Carousel */}
                <Container fluid className="mt-5">
                    <h1 className="text-center">Events</h1>
                    {eventsAdditional.length === 0 ? (
                        <p className="text-muted text-center">No events found.</p>
                    ) : (
                        <Carousel interval={null} indicators={false} prevLabel="" nextLabel="" className="px-5">
                            {additionalGroupedEvents.map((chunk, index) => (
                                <Carousel.Item key={index} >
                                    <div className="d-flex flex-nowrap overflow-hidden">
                                        {chunk.map((event, idx) => (
                                            <div key={idx} className="ms-3">
                                                <EventCard {...event} />
                                            </div>
                                        ))}
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </Container>

                {/* Volunteer Events with Carousel */}
                <Container fluid className="mt-5">
                <h1 className="text-center">Events Looking for Volunteers</h1>
                {eventsVolNeed.length === 0 ? (
                    <p className="text-muted text-center">No events needing volunteers found.</p>
                ) : (
                    <Carousel interval={null} indicators={false} prevLabel="" nextLabel="" className="px-5">
                        {volunteerGroupedEvents.map((chunk, index) => (
                            <Carousel.Item key={index}>
                                <div className="d-flex flex-nowrap overflow-hidden">
                                    {chunk.map((event, idx) => (
                                        <div key={idx} className="me-3">
                                            <EventCard {...event} />
                                        </div>
                                    ))}
                                </div>
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