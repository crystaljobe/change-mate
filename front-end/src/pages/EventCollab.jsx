import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
// import { getEventDetails} from "../utilities/EventUtilities";
import DetailedEventCard from "../components/DetailedEventCard";
import DiscussionForum from "../components/DiscussionForum";
import TodoList from "../components/ToDoList";
import ParticipantList from "../components/ParticipantList";
import LlamaImg from "../assets/llama-homepage.png";

function EventCollab() {

    // //state to store event details
    // const [eventDetails, setEventDetails] = useState(null);

    // useEffect(() => {
    //     getEvent();
    // }, []);

    // // const getEvent = async () => {
    // //     const eventDetails = await getEventDetails(eventID);
    // //     setEventDetails(eventDetails);
    // // }
    const showAddToDo = false

    const eventDetails = {
        title: "Sample Event",
        collaborators: [{ display_name: "John Doe" }],
        event_photo: LlamaImg,
        description: "Description of the event here",
        startDate: "2023-10-01",
        startTime: "10:00 AM",
        endDate: "2023-10-02",
        endTime: "12:00 PM",
        time_zone: "EST",
        event_type: "In-Person",
        virtual_event_link: "http://example.com",
        event_venue: "Convention Center",
        event_venue_address: "123 Main St"
      };

    return (
        <Container fluid className="event-collab-container">
            <Row className="gx-5">
                <Col md={4} className="event-details-col">
                    <DetailedEventCard eventDetails={eventDetails} />
                    <ParticipantList />
                </Col>
                <Col md={4} className="discussion-forum-col">
                    <DiscussionForum />
                </Col>
                <Col md={4} className="todo-participant-col">
                    <TodoList showAddToDo={showAddToDo} />
                    
                </Col>
            </Row>
        </Container>
    );
}

export default EventCollab;
