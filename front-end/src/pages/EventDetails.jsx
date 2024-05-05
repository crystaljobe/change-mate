import { Container, Col, Row, Button, Card } from "react-bootstrap";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventDetails, setUserAttending } from "../utilities/EventUtilities";
import DetailedEventCard from "../components/DetailedEventCard";
import VolunteerApplication from "../components/VolunteerApplication";
import StaticMap from "../components/EventDetailsStaticMap";

export default function EventDetails() {
	let { eventID } = useParams();
	const { userProfileData } = useOutletContext();
	const [eventDetails, setEventDetails] = useState({});
	// boolean to check if user is attending event
	const [rsvp, setRSVP] = useState(
		Boolean(userProfileData.events_attending.filter((event) => event.id === eventID).length)
		);
	// console.log(userProfileData)
	// console.log(eventDetails)

	//consolidated useEffects on page and only recall api if event id changes
	useEffect(() => {
		//only fetch data once
		async function fetchAllData() {
			try {
				//get and set event details
				const event = await getEventDetails(eventID);
				setEventDetails(event);
				// console.log("fetching and setting")
			} catch (error) {
				console.error(error);
			}
		}
		fetchAllData();

	}, []);

	// Renders button conditionally based on if user is attending event
	const renderAttendingButton = () => {
		// if user not attending already return button else disable button
		if (rsvp){
			return <Button onClick={handleRSVP}> Attend </Button>
		} else {
			return <Button onClick={handleRSVP}> Un-RSVP </Button>
		}
	};
	// onClick function for RSVP button to handle put request to add user as attending
	const handleRSVP = async () => {
		const response = await setUserAttending(eventID, rsvp);
		setRSVP(!rsvp)
		if (response) {
			console.log("user rsvp");
		}
	};


	// application modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Container>
			<Row>
				<Col md={8} sm={12}>
					{eventDetails.hosts && <DetailedEventCard {...eventDetails} />}
				</Col>

				{/*Map displaying event location with link to google maps*/}
				<Col md={4} sm={12} className="text-center">
					<br />
					{eventDetails.event_type === "In-person" && (
						<Row className="justify-content-center">
							{eventDetails.lat && (
								<StaticMap lat={eventDetails.lat} lng={eventDetails.lon} />
							)}
						</Row>
					)}
					<Row>
					<Card className="text-center">
						<Card.Header>Ready to make a difference?</Card.Header>
						<Card.Body>
							<Card.Title>Special title treatment</Card.Title>
							<Card.Text>
							With supporting text below as a natural lead-in to additional content.
							</Card.Text>
							<Button variant="primary">Go somewhere</Button>
						</Card.Body>
						<Card.Footer className="text-muted">2 days ago</Card.Footer>
						</Card>
					</Row>
					<Row>
						{/* if event needs attendees */}
						{eventDetails.hosts && !eventDetails.attendees_needed ? null : renderAttendingButton() }
					</Row>
					<Row>
						{/* if event needs volunteers */}
						{eventDetails.hosts && eventDetails.volunteer_roles.length > 0  
						?  (
							<div className="mt-3">
							<Button variant="primary" onClick={handleShow}>Volunteer</Button>
							<VolunteerApplication
								show={show}
								handleClose={handleClose}
								eventID={eventID}
							/>
							</div>
							) 
						: null }
							
					</Row>
				</Col>
			</Row>
		</Container>
	);
}
