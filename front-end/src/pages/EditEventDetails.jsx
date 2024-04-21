import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AddressAutofill } from "@mapbox/search-js-react";
import { getInterestCategories } from "../utilities/InterestCategoriesUtilities";
import { deleteEvent, getEventDetails, updateEventDetails } from "../utilities/EventUtilities";

export default function EditEventDetails() {
	let { eventID } = useParams();
	const navigate = useNavigate();
	// set interest categories for option selection
	const [interestCategories, setInterestCategories] = useState([]);
	// set event and event details data
	const [event, setEvent] = useState("");
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [timeZone, setTimeZone] = useState("");
	const [eventType, setEventType] = useState("");
	const [eventVenue, setEventVenue] = useState("");
	const [eventVenueAddress, setEventVenueAddress] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");

	// get interest cats and set them 
	const eventInterestCategories = async () => {
		const categories = await getInterestCategories();
		setInterestCategories(categories);
	};

	// get event details using utility function and set all data
	const getEvent = async () => {
		const eventDetails = await getEventDetails(eventID);
		console.log(eventDetails)
		setEvent(eventDetails);
		setTitle(eventDetails.title);
		setDate(eventDetails.date);
		setTime(eventDetails.time);
		setTimeZone(eventDetails.time_zone);
		setEventType(eventDetails.event_type);
		setEventVenue(eventDetails.event_venue);
		setEventVenueAddress(eventDetails.event_venue_address);
		setDescription(eventDetails.description);
		setCategory(eventDetails.category.id);
	};

	// update event details in BE using utility function
	const updateEvent = async () => {
		let responseStatus = await updateEventDetails(eventID, title, date, time, timeZone, eventType, eventVenue, eventVenueAddress, description, category);
		if (responseStatus) {
			navigate("/profile");
		} 
	};

	// onclick event handler if user clicks "delete" button
	const deleteEntireEvent = async () => {
		const responseStatus = await deleteEvent(eventID, event);
		if (responseStatus) {
			navigate("/profile");
		}
	}

	// upon submit prevent default and call on update event funct
	function handleSubmit(e) {
		e.preventDefault();
		updateEvent();
	}

	// upon page render get event details then get interest cats
	useEffect(() => {
		getEvent().then(eventInterestCategories());
	}, []);
	
	return (
		<Container>
			<br />
			<Row className="space justify-content-md-center">
				<Col md="auto">
					<h2>Enter the following event details:</h2>
				</Col>
			</Row>

			<Row className="space justify-content-md-center">
				<Col></Col>
				<Col className="text-center">
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="title">
							<Form.Label>
								Event Title:
								<input
									type="text"
									size={40}
									defaultValue={event && event.title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Form.Label>
						</Form.Group>

						<Form.Group className="mb-3" controlId="date">
							<Form.Label>
								Date of event:
								<input
									type="date"
									size={40}
									defaultValue={event && event.date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</Form.Label>
						</Form.Group>

						<Form.Group className="mb-3" controlId="time">
							<Form.Label>
								Enter your event&apos;s time frame:
								<input
									type="text"
									size={40}
									defaultValue={event && event.time}
									onChange={(e) => setTime(e.target.value)}
								/>
							</Form.Label>
						</Form.Group>

						<Form.Group className="mb-3" controlId="time_zone">
							<Form.Label>
								Enter your event&apos;s timezone:
								<input
									type="text"
									size={40}
									defaultValue={event && event.time_zone}
									onChange={(e) => setTimeZone(e.target.value)}
								/>
							</Form.Label>
						</Form.Group>

						<Form.Group className="mb-3" controlId="event_type">
							<Form.Label>
								Will the event be in-person or virtual?
								<br />
								<select
									size={2}
									value={event && event.event_type}
									onChange={(e) => setEventType(e.target.value)}>
									<option value="Virtual">Virtual</option>
									<option value="In-person">In-person</option>
								</select>
							</Form.Label>
						</Form.Group>

						<Form.Group className="mb-3" controlId="event_venue">
							<Form.Label>
								Event Venue:
								<input
									type="text"
									size={40}
									defaultValue={event && event.event_venue}
									onChange={(e) => setEventVenue(e.target.value)}
								/>
							</Form.Label>
						</Form.Group>

						<Form.Group className="mb-3" controlId="event_venue_address">
							<Form.Label>
								Enter the venue address:
								<br />
								<AddressAutofill accessToken="pk.eyJ1IjoibWNyZXlub2xkc2giLCJhIjoiY2x2MzFuNzN6MGhoOTJycnd5ZHQ3eWR4ayJ9.QKI5tsCAXhuzNb2XzhyjOg">
									<input
										name="address"
										placeholder="Address"
										type="text"
										autoComplete="address-line1"
										size={40}
										defaultValue={event && event.event_venue_address}
										onChange={(e) => setEventVenueAddress(e.target.value)}
									/>
								</AddressAutofill>
							</Form.Label>
						</Form.Group>

						<Form.Group className="mb-3" controlId="description">
							<Form.Label>
								Tell others about your event and why they should join:
								<textarea
									type="text"
									rows={10}
									cols={40}
									defaultValue={event && event.description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</Form.Label>
						</Form.Group>

						<Form.Group className="mb-3" controlId="category">
							<Form.Label>
								Select only one event category:
								<select
									size={6}
									value={event && category}
									onChange={(e) => setCategory(e.target.value)}>
									{event &&
										interestCategories &&
										interestCategories.map((category) => (
											<option key={category.id} value={category.id}>
												{category.category}
											</option>
										))}
								</select>
							</Form.Label>
						</Form.Group>
						<Button variant="danger" type="button" onClick={deleteEntireEvent} style={{marginRight:"10px"}}>
							Delete Event
						</Button>					
						<Button variant="info" type="submit">
							Submit changes
						</Button>
					</Form>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
}
