import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEventIcon } from "../utilities/DefaultIconsUtilities";

import {
  Container,
  Col,
  Row,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";


    
function DetailedEventCard({eventDetails, cardCSS}) {
  // id, title, event_photo, description, collaboratorsStr, startDate, startTime, endDate, endTime, time_zone, event_type, virtual_event_link, event_venue, event_venue_address,
    const [eventIcon, setEventIcon] = useState("");
    const [collabStr, setCollabStr] = useState("");

    //creates CollaboratorsStr from collab arr in eventDetails
    function setUpCardInfo (){
        let collaborators = eventDetails.collaborators.map((collab) => collab.display_name);
        const collaboratorsStr = collaborators.join(", ");
        setCollabStr(collaboratorsStr)
    };

    // Fetches default event icon
    const fetchEventIcon = async () => {
        const icon = await getEventIcon();
        setEventIcon(icon);
    };

    useEffect(() => {
        fetchEventIcon();
     }, []);

     //only runs function once collaborators is loaded
     useEffect(()=>{
        if (eventDetails.collaborators !== undefined){
       setUpCardInfo()
        }
     }, [eventDetails])

     
  return (
    <Card style={cardCSS} sm={8} border="light">
      <Card.Body>
        <Card.Title
          as="h1"
          style={{ fontWeight: "bold", color: "#6840DF" }}
          className="text-left"
        >
          {eventDetails && eventDetails.title}
        </Card.Title>

        <Card.Subtitle style={{ fontStyle: "italic" }} className="text-left">
          Hosted by: {collabStr}
        </Card.Subtitle>
        {/* Conditional rendering of event photo; If event has photo, render that; If no photo, render default event icon */}
        <Card.Img
          variant="top"
          src={eventDetails.event_photo || eventIcon}
          style={{
            width: "80vw",
            maxWidth: "250px",
            margin: "0 auto",
            display: "block",
          }}
          alt={`${eventDetails.title}'s photo`}
        />

        <ListGroup variant="flush">
          {/* !!updated this information to reflect current variable names */}
          <ListGroup.Item>
            <ul>
              <li>
                <strong> Start: </strong>
                {eventDetails &&
                  eventDetails.startDate &&
                  eventDetails.startTime &&
                  `${eventDetails.startDate} at ${eventDetails.startTime}`}
              </li>
              <li>
                <strong> End: </strong>
                {eventDetails &&
                  eventDetails.endDate &&
                  eventDetails.endTime &&
                  `${eventDetails.endDate} at ${eventDetails.endTime}`}
              </li>

              <li>
                {" "}
                <strong> Time Zone: </strong>{" "}
                {eventDetails && eventDetails.time_zone}
              </li>
              <li>
                <strong> Virtual or In-Person?: </strong>
                {eventDetails && eventDetails.event_type}
              </li>
              {eventDetails.event_type === "Virtual" ? (
                <li>
                  <strong> Event Link: </strong>
                  {eventDetails && eventDetails.virtual_event_link}
                </li>
              ) : (
                <>
                  <li>
                    <strong> Event Venue: </strong>
                    {eventDetails && eventDetails.event_venue}
                  </li>
                  <li>
                    <strong>Venue Address: </strong>
                    {eventDetails && eventDetails.event_venue_address}
                  </li>
                </>
              )}
            </ul>
          </ListGroup.Item>
          <ListGroup.Item className="text-left">
            <h4 style={{ textDecoration: "underline" }}>About this event:</h4>
            {eventDetails && eventDetails.description}
          </ListGroup.Item>
        </ListGroup>
        <br />
      </Card.Body>
    </Card>
  );
};

export default DetailedEventCard;
