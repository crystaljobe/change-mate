import { Container, Col, Row, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import "add-to-calendar-button";
import { getEventDetails, setUserAttending } from "../utilities/EventUtilities";
import { getUserProfile } from "../utilities/UserProfileUtilities";
import { getEventIcon } from '../utilities/DefaultIconsUtilities';
import { getiCalEventDetails } from "../utilities/EventUtilities";
import gps from "../assets/gps.jpg";
import DetailedEventCard from "../components/DetailedEventCard";


export default function EventDetails() {
  let { eventID } = useParams();
  const [iCalDetails, setiCalDetails] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [usersAttending, setUsersAttending] = useState([]);
  const [eventsAttending, setEventsAttending] = useState([]);
  const [userID, setUserID] = useState();
  const myOutletContextObj = useOutletContext();

  const { user } = myOutletContextObj;


  // Gets list of events user is attending; Used in isUserAttending function
  const handleUserEventsAttending = async () => {
    let userResponse = await getUserProfile(user);
    let events = userResponse.events_attending
    setEventsAttending(events)
  };

  //gets iCal-specific format of event Details for add-to-personal-calendar button
  const getiCalInfo = async () => {
    const response = await getiCalEventDetails(eventID);
    setiCalDetails(response);
    // console.log("EVENT DETAILS page--iCal details:", iCalDetails);

  };


  // get event details using event utilities and set the event details
  const getEvent = async () => {
    const eventDetails = await getEventDetails(eventID);
    setEventDetails(eventDetails);
    console.log("EVENT DETAILS page--event details:", eventDetails);

    setUsersAttending(eventDetails.users_attending);
    //---this is being handled on DetailedEventCard, leaving commented out in case we need it on this page later
      // map through collaborators to get their display names
      // let collabArr = eventDetails.collaborators;
      // let collaborators = collabArr.map((collab) => collab.display_name);
      // setCollaborators(collaborators);
      // console.log(eventDetails.data);
  };

  //consolidated useEffects on page
  useEffect(() => {
    getEvent();
    handleUserEventsAttending();
    getiCalInfo();
  }, []);

  // onClick function for RSVP button to handle rsvp api call
  const handleRSVP = async () => {
    const rsvp = await setUserAttending(eventID);
  };

  // Checks the events that the user is attending for id match with the eventID for this page
  const isUserAttending = () => {
    // Checks if eventsAttending has data
    if(eventsAttending && eventsAttending.length > 0) {
      // Loops through the events
      for (const event of eventsAttending) {
        // Makes comparison between the page's eventID and the user's event.id
        if (eventID == event.id) {
          // If match user is RSVPed
          return true
        }
      }
    } else {
      return false
    }
  };

  // Renders button conditionally based on if user is RSVPed
  const renderRSVPButton = () => {
    // Sets attending to true or false based on function call
    const attending = isUserAttending()
    // If attending render disabled button that tells the user they've already RSVPed
    if (attending) {
      return (
        // <Button
        //   size="sm"
        //   variant="light"
        //   className="text-center"
        //   disabled
        // >
        // </Button>
        <span>Attending</span>
      );
    } else {
      // Else render functioning RSVP button
      // return <Button
      //           className="text-center"
      //           variant="info"
      //           onClick={handleRSVP}
      //         >
      //           RSVP
      //         </Button>
      return <span onClick={handleRSVP}>Attend</span>;
    }
  };
  const cardCSS = {width: "90vw", maxWidth: "500px"}
  return (
    <Container>
      <Row>
        <Col>
          <br />
          {eventDetails && (
            <DetailedEventCard
              eventDetails={eventDetails}
              cardCSS={cardCSS}
            ></DetailedEventCard>
          )}
          {renderRSVPButton()}
          <div class="dropdown-container">
            <button class="dropdown-button">Count me in!</button>
            <div class="dropdown-content">
              <a href="#">Volunteer</a>
              <a href="#"> {renderRSVPButton()}</a>
            </div>
          </div>
        </Col>

        {/*LOCATION IMG &&&& DIRECTIONS BUTTON */}
        <Col>
          <br />
          <Card style={{ width: "90vw", maxWidth: "300px" }} sm={4}>
            <Card.Img src={gps}></Card.Img>
          </Card>
          <Link to="/eventdirections">
            <button
              className="button-gradient text-center"
              variant="info"
              style={{ width: "90vw", maxWidth: "300px" }}
            >
              Get Event Directions
            </button>
          </Link>
          <add-to-calendar-button
            style={{ height: "50px" }}
            size="5"
            label="Add to personal calendar"
            options="'Apple','Google','iCal','Outlook.com','Microsoft 365','Microsoft Teams','Yahoo'"
            name={iCalDetails.title}
            location={
              eventDetails.event_type === "Virtual"
                ? eventDetails.virtual_event_link
                : `${eventDetails.event_venue} - ${eventDetails.event_venue_address}`
            }
            startDate={iCalDetails.startDate}
            endDate={iCalDetails.endDate}
            startTime={iCalDetails.startTime}
            endTime={iCalDetails.endTime}
            timeZone={iCalDetails.time_zone}
            description={iCalDetails.description}
          ></add-to-calendar-button>
        </Col>
      </Row>
    </Container>
  );
}

//  <Card.Body>
//    <Card.Title
//      as="h1"
//      style={{ fontWeight: "bold", color: "#6840DF" }}
//      className="text-center"
//    >
//      {eventDetails && eventDetails.title}
//    </Card.Title>

//    <Card.Subtitle style={{ fontStyle: "italic" }} className="text-center">
//      Hosted by: {collaboratorsStr}
//    </Card.Subtitle>
//    {/* Conditional rendering of event photo; If event has photo, render that; If no photo, render default event icon */}
//    <Card.Img
//      variant="top"
//      src={eventDetails.event_photo || eventIcon}
//      style={{ height: "500px" }}
//      alt={`${eventDetails.title}'s photo`}
//    />

//    <ListGroup variant="flush">
//      {/* !!updated this information to reflect current variable names */}
//      <ListGroup.Item>
//        <Card.Text style={{ textDecoration: "underline", fontSize: "larger" }}>
//          Event Details:
//        </Card.Text>
//        <ul>
//          <li>
//            <strong> Start: </strong>
//            {eventDetails &&
//              eventDetails.startDate &&
//              eventDetails.startTime &&
//              `${eventDetails.startDate} at ${eventDetails.startTime}`}
//          </li>
//          <li>
//            <strong> End: </strong>
//            {eventDetails &&
//              eventDetails.endDate &&
//              eventDetails.endTime &&
//              `${eventDetails.endDate} at ${eventDetails.endTime}`}
//          </li>

//          <li>
//            {" "}
//            <strong> Time Zone: </strong>{" "}
//            {eventDetails && eventDetails.time_zone}
//          </li>
//          <li>
//            <strong> Virtual or In-Person?: </strong>
//            {eventDetails && eventDetails.event_type}
//          </li>
//          {eventDetails.event_type === "Virtual" ? (
//            <li>
//              <strong> Event Link: </strong>
//              {eventDetails && eventDetails.virtual_event_link}
//            </li>
//          ) : (
//            <>
//              <li>
//                <strong> Event Venue: </strong>
//                {eventDetails && eventDetails.event_venue}
//              </li>
//              <li>
//                <strong>Venue Address: </strong>
//                {eventDetails && eventDetails.event_venue_address}
//              </li>
//            </>
//          )}
//        </ul>
//      </ListGroup.Item>
//      <ListGroup.Item className="text-left">
//        <h4 style={{ textDecoration: "underline" }}>About this event:</h4>
//        {eventDetails && eventDetails.description}
//      </ListGroup.Item>
//    </ListGroup>
//    <br />
//    <Card.Body className="text-center">
//      <br />
//      <br />
//    </Card.Body>
//  </Card.Body>;