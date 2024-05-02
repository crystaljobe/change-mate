import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { getEventDetails} from "../utilities/EventUtilities";
import DetailedEventCard from "../components/DetailedEventCard";
import VolunteerManager from "../components/VolunteerManager";
import TodoList from "../components/ToDoList";

function EventCollab() {
    const [eventDetails, setEventDetails] = useState({});
    const { eventID } = useParams();

    useEffect(() => {
        getEvent();
    }, []);

    const getEvent = async () => {
        const eventDetails = await getEventDetails(eventID);
        setEventDetails(eventDetails);
        console.log(eventDetails)
    }
    const showAddToDo = false


    return (
        <Container fluid className="event-collab-container">
            <Row className="gx-5">
                <Col md={4} className="event-details-col">
                    <DetailedEventCard eventDetails={eventDetails} />
                </Col>
                <Col md={4} className="discussion-forum-col">
                    <VolunteerManager />
                </Col>
                <Col md={4} className="todo-participant-col">
                    <TodoList showAddToDo={showAddToDo} />
                    
                </Col>
            </Row>
        </Container>
    );
}

export default EventCollab;
