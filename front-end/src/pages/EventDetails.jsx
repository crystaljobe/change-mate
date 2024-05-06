import { Container, Col, Row, Button } from "react-bootstrap";
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
	const [rsvp, setRSVP] = useState(true);

	//consolidated useEffects on page and only recall api if event id changes
	useEffect(() => {
		async function fetchAllData() {
			try {
				const event = await getEventDetails(eventID);
				setEventDetails(event);
				// Fetching userProfileData if not already available
				// Assuming userProfileData is also fetched asynchronously
			} catch (error) {
				console.error(error);
			}
		}
	
		fetchAllData();
	}, [eventID]); // Make sure to include eventID and userProfileData in the dependencies array
	
	useEffect(() => {
		if (userProfileData && eventDetails) {
			const isAttending = userProfileData.events_attending && userProfileData.events_attending.filter(event => event.id === eventID);
			setRSVP(isAttending);
		}
	}, [userProfileData, eventDetails, eventID]);

	// console.log(userProfileData)
	// console.log(eventDetails)


	//conditional for setting # of users
	function usersAttendingMessage() {
		if (num_users_attending === 0) {
			return;
		} else if (num_users_attending === 1) {
			return `${num_users_attending} of your mates is attending this event, would you like to join them at this event?`;
		} else {
			return `${num_users_attending} of your mates are attending this event, would you like to join them at this event?`;
		}
	}

	//conditional for setting # of volunteers needed
	function volunteersNeededMessage() {
		if (volunteer_spots_remaining === 0) {
			return "All volunteer spots filled!";
		} else if (volunteer_spots_remaining === 1) {
			return `This event is needing ${volunteer_spots_remaining} more volunteer. Would you like to volunteer for this event?`;
		}
	}

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
					{console.log(eventDetails.lat)}
					{eventDetails.lat && (
						<Row className="justify-content-center">
								<StaticMap lat={eventDetails.lat} lng={eventDetails.lon} />
						</Row>
					)}
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
								eventDetails={eventDetails}
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