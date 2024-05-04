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
                    {eventDetails.hosts && <DetailedEventCard {...eventDetails}/>}
                </Col>
                <Col md={4} className="discussion-forum-col">
                    {eventDetails.hosts && <DiscussionForum eventDetails={eventDetails} postType={collabPost}/>}
                </Col>
                <Col md={4} className="todo-participant-col">
                    {eventDetails.hosts && <TodoList showAddToDo={showAddToDo} eventDetails={eventDetails} />}
                    
                </Col>
            </Row>
        </Container>
    );
}

export default EventCollab;
