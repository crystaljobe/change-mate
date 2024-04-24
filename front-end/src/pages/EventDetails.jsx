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
		setUsersAttending(eventDetails.users_attending);
		// map through collaborators to get their display names
		let collabArr = eventDetails.collaborators;
		let collaborators = collabArr.map((collab) => collab.display_name);
		setCollaborators(collaborators);
		console.log(eventDetails.data);
	};

	// TODO: disable button if rsvp is sucessful
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
								className="text-center">
								{eventDetails && eventDetails.title}
							</Card.Title>
							<Card.Subtitle
								style={{ fontStyle: "italic" }}
								className="text-center">
								Hosted by: {collaboratorsStr}
							</Card.Subtitle>

							{eventDetails.event_photo && (
								<div className="text-center">
									<img src={eventDetails.event_photo} alt="Event" style={{ width: "100%", marginTop: "20px" }} />
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
									to="/eventdirections">
									Get Event Directions
								</Button>
								<br />
								<br />
								<Button
									className="text-center"
									variant="info"
									onClick={handleRSVP}>
									RSVP
								</Button>
								{/* TODO: <add-to-calendar-button>
									name="Title" 
                                    options="'Apple','Google'" 
                                    location="World Wide
									Web" 
                                    startDate="2024-04-19" 
                                    endDate="2024-04-19"
									startTime="10:15" 
                                    endTime="23:30"
									timeZone="America/Los_Angeles"
								</add-to-calendar-button> */}
							</Card.Body>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}