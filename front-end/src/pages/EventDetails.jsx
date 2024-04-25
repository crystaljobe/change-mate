import { Container, Col, Row, ListGroup, Card, Button } from "react-bootstrap";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import "add-to-calendar-button";
import { getEventDetails, setUserAttending } from "../utilities/EventUtilities";
import { getUserProfile } from "../utilities/UserProfileUtilities";
import { getEventIcon } from '../utilities/DefaultIconsUtilities';

export default function EventDetails() {
  let { eventID } = useParams();
  const [eventDetails, setEventDetails] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [usersAttending, setUsersAttending] = useState([]);
  const [eventsAttending, setEventsAttending] = useState([]);
  const [eventIcon, setEventIcon] = useState("");
  const [userID, setUserID] = useState();
  const myOutletContextObj = useOutletContext();
  const { user } = myOutletContextObj;
  const collaboratorsStr = collaborators.join(", ");

  // Fetches default event icon
  const fetchEventIcon = async () => {
    const icon = await getEventIcon()
    setEventIcon(icon)
}

  useEffect(() => {
    fetchEventIcon()
  }, []);

  // Gets list of events user is attending; Used in isUserAttending function
  const handleUserEventsAttending = async () => {
    let userResponse = await getUserProfile(user);
    let events = userResponse.events_attending
    setEventsAttending(events)
  };

  useEffect(() => {
    handleUserEventsAttending();
  }, []);

  // get event details using event utilities and set the event details
  const getEvent = async () => {
    const eventDetails = await getEventDetails(eventID);
    setEventDetails(eventDetails);
		console.log('EVENT DETAILS page--event details:', eventDetails)


    setUsersAttending(eventDetails.users_attending);
    // map through collaborators to get their display names
    let collabArr = eventDetails.collaborators;
    let collaborators = collabArr.map((collab) => collab.display_name);
    setCollaborators(collaborators);
    console.log(eventDetails.data);
  };

  useEffect(() => {
    getEvent();
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
  }

  // Renders button conditionally based on if user is RSVPed
  const renderRSVPButton = () => {
    // Sets attending to true or false based on function call
    const attending = isUserAttending()
    // If attending render disabled button that tells the user they've already RSVPed
    if (attending) {
      return <Button
                className="text-center"
                variant="info"
                disabled
              >
                You're RSVPed
              </Button>
    } else {
      // Else render functioning RSVP button
      return <Button
                className="text-center"
                variant="info"
                onClick={handleRSVP}
              >
                RSVP
              </Button>
    }
  }

  return (
    <Container>
      <Row className="ustify-content-md-center">
        <Col className="justify-content-md-center">
          <br />
          <Card style={{ width: "35rem" }} border="light">
            <Card.Body>
              <Card.Title
                as="h1"
                style={{ fontWeight: "bold", color: "#6840DF" }}
                className="text-center"
              >
                {eventDetails && eventDetails.title}
              </Card.Title>
              <Card.Subtitle
                style={{ fontStyle: "italic" }}
                className="text-center"
              >
                Hosted by: {collaboratorsStr}
              </Card.Subtitle>
              {/* Conditional rendering of event photo; If event has photo, render that; If no photo, render default event icon */}
              <Card.Img variant="top" src={eventDetails.event_photo || eventIcon} style={{ height: '500px' }} alt={`${eventDetails.title}'s photo`} />

              <ListGroup variant="flush">
                <ListGroup.Item as="h5" className="text-center">
                  {eventDetails && eventDetails.description}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Card.Text style={{ fontWeight: "bold" }}>
                    Event Details:
                  </Card.Text>
                  <ul>
                    <li>Date: {eventDetails && eventDetails.date}</li>
                    <li>
                      Event Type: {eventDetails && eventDetails.event_type}
                    </li>
                    <li>Time: {eventDetails && eventDetails.time}</li>
                    <li>Time Zone: {eventDetails && eventDetails.time_zone}</li>
                    <li>
                      Event Venue: {eventDetails && eventDetails.event_venue}
                    </li>
                    <li>
                      Venue Address:{" "}
                      {eventDetails && eventDetails.event_venue_address}
                    </li>
                  </ul>
                </ListGroup.Item>
              </ListGroup>
              <br />
              <Card.Body className="text-center">
                <Button
                  className="text-center"
                  variant="info"
                  as={Link}
                  to="/eventdirections"
                >
                  Get Event Directions
                </Button>
                <br />
                <br />
                {renderRSVPButton()}
                
                <add-to-calendar-button
                  size="3"
                  label="Add to personal calendar"
                  // buttonsList
                  // hideTextLabelButton
                  // buttonStyle="round"
                  options="'Apple','Google','iCal','Outlook.com','Microsoft 365','Microsoft Teams','Yahoo'"
                  name={eventDetails.title}
                  //   add a conditional rendering for event_type --> do we still need event link for inperson?
                  location={
                    eventDetails.event_type === "Virtual"
                      ? eventDetails.virtual_event_link
                      : `${eventDetails.event_venue} - ${eventDetails.event_venue_address}`
                  }
                  startDate={eventDetails.startDate}
                  endDate={eventDetails.endDate}
                  startTime={eventDetails.startTime}
                  endTime={eventDetails.endTime}
                  timeZone={eventDetails.time_zone}
                  description={eventDetails.description}
                ></add-to-calendar-button>
              </Card.Body>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}