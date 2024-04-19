import {
	Container,
	Col,
	Row,
	CardGroup,
	ListGroup,
	Card,
	Button,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../utilities";
import "add-to-calendar-button";

export default function EventDetails() {
	let { eventID } = useParams();
	const [eventDetails, setEventDetails] = useState([]);
	const [collaborators, setCollaborators] = useState([]);
	const [usersAttending, setUsersAttending] = useState([]);
	const collaboratorsStr = collaborators.join(", ");

	const getEvent = async () => {
		const response = await api.get(`events/${eventID}`);
		let data = response.data;
		setEventDetails(data);
		setUsersAttending(data.users_attending);

		let collabArr = data.collaborators;
		let collaborators = collabArr.map((collab) => collab.display_name);
		setCollaborators(collaborators);
		console.log(response.data);
	};

	// let response = await api.put(`eventDetails/${eventID}/`, {
	//     users_attending: usersAttending;
	// });
	//handle

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
								{/* <add-to-calendar-button>
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
