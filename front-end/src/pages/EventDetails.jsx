import {
	Container, Col, Row, ListGroup, Card, Button } from "react-bootstrap";
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
	const [userID, setUserID] = useState()
	const myOutletContextObj = useOutletContext();
    const { user } = myOutletContextObj;
	const collaboratorsStr = collaborators.join(", ");

	useEffect(() => {
		const handleUserID = async () => {
		  let userResponse = await getUserProfile(user);
		  let id = userResponse.id
		  setUserID(id);
		};
	  
		if (!userID) {
		  handleUserID();
		}
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

	// TODO: disable button if rsvp is successful
	// handle rsvp should work; backend needs fixing to test
	const handleRSVP = async () => {
		const rsvp = await setUserAttending(eventID, userID)
	}

	useEffect(() => {
		getEvent();
	}, []);

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
                <Button
                  className="text-center"
                  variant="info"
                  onClick={handleRSVP}
                >
                  RSVP
                </Button>
                {/* TODO: <add-to-calendar-button>
									name="Title"  --> {eventDetails.title}
                                    options="'Apple','Google'" 
                                    location="World Wide
									Web" --> if eventDetails.event_type === virtual ? can be a url || eventDetails.event_venue + .event_venue_address
                                    startDate="2024-04-19"  {eventDetails.startDate}
                                    endDate="2024-04-19" {eventDetails.endDate}
									startTime="10:15" {eventDetails.startTime}
                                    endTime="23:30" {eventDetails.endTime}
									timeZone="America/Los_Angeles" {eventDetails.time_zone}

									label="Hit me to save!"
									size="5"
									??multiple buttons:
									buttonsList
  									hideTextLabelButton
  									buttonStyle="round"
								</add-to-calendar-button> */}
                <add-to-calendar-button
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
