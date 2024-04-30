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


function DetailedEventCard({eventDetails}) {
  // id, title, event_photo, description, collaboratorsStr, startDate, startTime, endDate, endTime, time_zone, event_type, virtual_event_link, event_venue, event_venue_address,
    const [eventIcon, setEventIcon] = useState("");
    const [collabStr, setCollabStr] = useState("");
    const styles = {
      cardCSS: {
        // width: "80vw", 
        maxWidth: "800px",
        margin: "24px",
      },
      header: {
        fontFamily: "Playfair Display, serif",
        fontOpticalSizing: "auto",
        fontStyle: "normal",
        fontWeight: "bold", 
        color: "#6840DF",
        textDecoration: "underline",
        marginTop: "15px",
        marginBottom: "15px",
      },
      body: {
        fontFamily: "Slabo 27px, serif",
        fontWeight: "400",
        fontStyle: "normal",
      },
      subheader: {
        fontFamily: "Slabo 27px, serif",
        fontWeight: "400",
        fontStyle: "italic",
      },
      icon: {
        width: "80vw",
        maxWidth: "250px",
        margin: "0 auto",
        display: "block",
      },
      image: {
        width: "100%",
        maxHeight: "575px",
        marginTop: "30px",
        marginBottom: "20px", 
      }
    }

    // Conditional Style based on src 
    const imageStyle = eventDetails.event_photo ? styles.image : styles.icon; 

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

    // updated to add conditional to only fetch icon if it's needed
    useEffect(() => {
        if (!eventDetails.photo && !eventIcon) {
          // console.log("no event photo getting eventIcon")
          fetchEventIcon();
        }

     }, []);

     //only runs function once collaborators is loaded
     useEffect(()=>{
        if (eventDetails.collaborators !== undefined){
       setUpCardInfo()
        }
     }, [eventDetails])

     
  return (
    <Card style={styles.cardCSS} sm={8} border="light" className="mt-4">
      <Card.Body>
        <Card.Title
          as="h1"
          style={styles.header}
          className="text-center"
        >
          {eventDetails && eventDetails.title}
        </Card.Title>

        <Card.Subtitle as="h5" style={styles.subheader} className="text-center mt-2">
          <span style={{fontStyle:"normal", fontWeight:"bold"}}>Hosted by:</span> {collabStr}
        </Card.Subtitle>

        {/* Conditional rendering of event photo and styling; If event has photo, render that; If no photo, render default event icon */}
        <Card.Img
          variant="top"
          src={eventDetails.event_photo || eventIcon}
          style={imageStyle}
          alt={`${eventDetails.title}'s photo`}
        />

        <ListGroup variant="flush">
          {/* !!updated this information to reflect current variable names */}
          <ListGroup.Item>
            <ul>
              <li>
                {/* conditional rendering for dates based on single or multiday event */}
                {eventDetails.startDate === eventDetails.endDate ? 
                (
                  <><strong> Date of Event: </strong> {eventDetails.startDate} </>
                ) : (
                  <><strong> Event Dates: </strong> {eventDetails.startDate} - {eventDetails.endDate} </>
                )
              }
              </li>
              <li>
                <strong> Time of Event: </strong>
                {eventDetails.startTime &&
                  `${eventDetails.startTime} - ${eventDetails.endTime}`}
              </li>

              <li>
                {" "}
                <strong> Time Zone: </strong>{" "}
                {eventDetails && eventDetails.time_zone}
              </li>
              <li>
                <strong> Type of Event: </strong>
                {eventDetails && `${eventDetails.event_type} Event`}
              </li>
              {eventDetails && eventDetails.event_type === "Virtual" ? (
                <li >
                  <strong> Event Link: </strong>
                  <a href={eventDetails.virtual_event_link} style={{fontSize:"14px"}}> {eventDetails.virtual_event_link} </a>
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
