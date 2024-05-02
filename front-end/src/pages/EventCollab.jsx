import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { getEventDetails} from "../utilities/EventUtilities";
import DetailedEventCard from "../components/DetailedEventCard";
import VolunteerManager from "../components/VolunteerManager";
import TodoList from "../components/ToDoList";
import DiscussionForum from '../components/DiscussionForum';

function EventCollab() {
    const [eventDetails, setEventDetails] = useState({});
    const { eventID } = useParams();
    const collabPost = 'collaborators'

    useEffect(() => {
        getEvent();
    }, []);

    const getEvent = async () => {
        const eventDetails = await getEventDetails(eventID);
        setEventDetails(eventDetails);
        console.log(eventDetails)
    }
    const showAddToDo = false
    // {"task": "Test 2", "assigned_host": "1"}

    return (
        <Container fluid className="event-collab-container">
            <Row className="gx-5">
                <Col md={4} className="event-details-col">
                    {/* <DetailedEventCard  
                        description={eventDetails.description}
                        title={eventDetails.title}
                        startTime={eventDetails.startTime}
                        startDate={eventDetails.startDate}
                        endTime={eventDetails.endTime}
                        endDate={eventDetails.endDate}
                        time_zone={eventDetails.time_zone}
                        event_type={eventDetails.event_type}
                        virtual_event_link={eventDetails.virtual_event_link}
                        event_venue={eventDetails.event_venue}
                        event_venue_address={eventDetails.event_venue_address}
                        // categoryName={eventDetails.category.category}
                        num_users_attending={eventDetails.num_users_attending}
                        volunteer_spots_remaining={eventDetails.volunteer_spots_remaining}
                        hosts={eventDetails.hosts}
                        event_photo={eventDetails.event_photo}
                        lat={eventDetails.lat}
                        lon={eventDetails.lon}
                    /> */}
                </Col>
                <Col md={4} className="discussion-forum-col">
                    <DiscussionForum eventDetails={eventDetails} postType={collabPost}/>
                </Col>
                <Col md={4} className="todo-participant-col">
                    <TodoList showAddToDo={showAddToDo} eventDetails={eventDetails} />
                    
                </Col>
            </Row>
        </Container>
    );
}

export default EventCollab;
