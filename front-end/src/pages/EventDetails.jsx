import {
	Container,
	Col,
	Row,
	Button,
	Card,
	CardFooter,
	Dropdown,
	DropdownButton,
} from "react-bootstrap";
import MUIbutton from "@mui/material/Button";
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
	// console.log(userProfileData)
	// console.log("rsvp status:", rsvp)

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
		if (userProfileData.events_attending && eventDetails.id) {
			const isAttending = userProfileData.events_attending.some((event) => event.id === eventDetails.id);
			setRSVP(!isAttending);
			// console.log("is attending", isAttending)
		}
	}, [userProfileData.events_attending, eventDetails, eventID]);

	// onClick function for RSVP button to handle put request to add user as attending
	const handleRSVP = async () => {
		console.log("put:", rsvp)
		const response = await setUserAttending(eventID, rsvp);
		setRSVP(!rsvp);
		if (response) {
			console.log("user rsvp");
		}
	};

	// application modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	function eventOptionsMessage() {
		if (
			eventDetails.attendees_needed &&
			eventDetails.volunteer_roles.length > 0
		) {
			return "This event needs attendees and volunteers, how would you like to participate?";
		} else if (
			eventDetails.attendees_needed &&
			eventDetails.volunteer_roles.length < 1
		) {
			return "Let the hosts know you'll be attending this event by clicking the button below!";
		} else if (
			!eventDetails.attendees_needed &&
			eventDetails.volunteer_roles.length > 0
		) {
			return "This event needs volunteers, to fill out the volunteer form click the button below!";
		}
	}

	return (
		<Container>
			<Row>
				<Col md={8} sm={12} className="d-flex justify-content-center">
					{eventDetails.hosts && <DetailedEventCard {...eventDetails} />}
				</Col>

				{/*Map displaying event location with link to google maps*/}
				<Col md={4} sm={12} className="text-center">
					<br />
					{eventDetails.lat && (
						<Row className="justify-content-center mt-4">
							<StaticMap lat={eventDetails.lat} lng={eventDetails.lon} />
						</Row>
					)}

					<Row className="d-flex justify-content-center">
						<Card className="mt-5" style={{ width: "22rem" }}>
							<Card.Header>Event Options</Card.Header>
							<Card.Body>
								{/* <Card.Title>Event Options</Card.Title> */}
								<Card.Text>
									{eventDetails.volunteer_roles && eventOptionsMessage()}
								</Card.Text>
							</Card.Body>
							<Card.Footer>
								<DropdownButton title="Count me in!" id="dropdown-basic-button" >
									{eventDetails.attendees_needed && rsvp ? (
										<Dropdown.Item as="button" className="text-center dropdown-hover" onClick={handleRSVP}>
											Attend
										</Dropdown.Item>
									) : null}
									 <Dropdown.Divider />
									{eventDetails.hosts &&
									eventDetails.volunteer_roles.length > 0 ? (
										<Dropdown.Item as="button" className="text-center dropdown-hover" onClick={handleShow}>
											Volunteer
										</Dropdown.Item>
									) : null}
								</DropdownButton>
							</Card.Footer>
						</Card>
					</Row>
					<Row className="d-flex justify-content-center">
						{!rsvp && (
							<Card
								className="mt-5 d-flex justify-content-center"
								style={{ width: "22rem" }}>
								<Card.Header>RSVP Options</Card.Header>
								<Card.Body className="d-flex justify-content-center flex-wrap">
									Things happen, if life gets in the way you can always update
									your RSVP.
									<MUIbutton
										onClick={handleRSVP}
										className="mt-2"
										variant="outlined"
										sx={{
											borderColor: "primary", // Default border color
											color: "primary",
											border: "1px solid",
											
											"&:hover": {
												backgroundColor: "secondary.dark",
												color: "white",
											},
										}}>
										Un-RSVP
									</MUIbutton>
								</Card.Body>
							</Card>
						)}
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
