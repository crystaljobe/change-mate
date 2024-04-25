import { Container, Col, Row, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import "add-to-calendar-button";
import { getEventDetails, setUserAttending } from "../utilities/EventUtilities";
import { getUserProfile } from "../utilities/UserProfileUtilities";

export default function EventDetails() {
  let { eventID } = useParams();
  const [eventDetails, setEventDetails] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [usersAttending, setUsersAttending] = useState([]);
  const [eventsAttending, setEventsAttending] = useState([]);
  const [userID, setUserID] = useState();
  const myOutletContextObj = useOutletContext();
  const { user } = myOutletContextObj;
  const collaboratorsStr = collaborators.join(", ");

  // Gets list of events user is attending; Used in isUserAttending function
  const handleUserEventsAttending = async () => {
    let userResponse = await getUserProfile(user);
    let events = userResponse.events_attending
    setEventsAttending(events)
  };

  //adding function to format date in more readable way
  function switchDateFormat(dateStr) {
    const dateArr = dateStr.split("-");
    let formattedDate = dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0];
    return formattedDate;
  }
  //adding function to format time in 12-hr format
  function switchTimeFormat(timeStr){
    const [hours, minutes, pmam] = timeStr.split(/[:\s]/)
    //convert hours to 12hr if 00,  then returns 12
    const hours12format = (parseInt(hours, 10) % 12 || 12)
    const formattedTime = `${hours12format}:${minutes} ${pmam}`
    return formattedTime
  }


  useEffect(() => {
    handleUserEventsAttending();
  }, []);

  // get event details using event utilities and set the event details
  const getEvent = async () => {
    const eventDetails = await getEventDetails(eventID);
    setEventDetails(eventDetails);
    console.log("EVENT DETAILS page--event details:", eventDetails);

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

              {/* if there is an event photo, will show up here: */}
              {eventDetails.event_photo && (
                <div className="text-center">
                  <img
                    src={eventDetails.event_photo}
                    alt="Event"
                    style={{ width: "100%", marginTop: "20px" }}
                  />
                </div>
              )}

              <ListGroup variant="flush">
                {/* !!updated this information to reflect current variable names */}
                <ListGroup.Item>
                  <Card.Text
                    style={{ textDecoration: "underline", fontSize: "larger" }}
                  >
                    Event Details:
                  </Card.Text>
                  <ul>
                    <li>
                      <strong> Start: </strong>
                      {eventDetails &&
                        eventDetails.startDate &&
                        eventDetails.startTime &&
                        `${switchDateFormat(
                          eventDetails.startDate
                        )} at ${switchTimeFormat(eventDetails.startTime)}`}
                    </li>
                    <li>
                      <strong> End: </strong>
                      {eventDetails &&
                        eventDetails.endDate &&
                        eventDetails.endTime &&
                        `${switchDateFormat(
                          eventDetails.endDate
                        )} at ${switchTimeFormat(eventDetails.endTime)}`}
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
                <ListGroup.Item as="h6" className="text-left">
                  <h4 style={{ textDecoration: "underline"}}>About this event:</h4>
                  {eventDetails && eventDetails.description}
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