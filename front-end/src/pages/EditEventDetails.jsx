import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../utilities";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { AddressAutofill } from "@mapbox/search-js-react";


    export default function EditEventDetails() {
        let { eventID } = useParams()
        const navigate = useNavigate()
        const [event, setEvent] = useState(null)
        const [interestCategories, setInterestCategories] = useState([]);
        const [title, setTitle] = useState(null)
        const [date, setDate] = useState(null)
        const [time, setTime] = useState(null)
        const [time_zone, setTimeZone] = useState(null)
        const [eventType, setEventType] = useState(null)
        const [eventVenue, setEventVenue] = useState(null)
        const [eventVenueAddress, setEventVenueAddress] = useState(null)
        const [description, setDescription] = useState(null)
        const [category, setCategory] = useState(null)

    function handleSubmit(e) {
		e.preventDefault();
		console.log(
			
		);
		updateEvent();
	}

	const updateEvent = async () => {
        console.log({"title" : title,
        "date" : date,
        "time" : time,
        "time_zone" : time_zone,
        "event_type" : eventType,
        "event_venue" : eventVenue,
        "event_venue_address" : eventVenueAddress,
        "description" : description,
        "category" : category})
		let response = await api.put(`events/${eventID}/`, {
			"title" : title,
            "date" : date,
            "time" : time,
            "time_zone" : time_zone,
            "event_type" : eventType,
            "event_venue" : eventVenue,
            "event_venue_address" : eventVenueAddress,
            "description" : description,
            "category" : category,
		});
		console.log(response.status);
		if (response.status === 200) {
			navigate("/profile");
		} else {
			console.log("error:", response.data);
		}
	};

    const getEvent = async () =>{
        const response = await api.get(`events/${eventID}`);
        console.log(response.data)
        setEvent(response.data)
        setTitle(response.data.title)
        setDate(response.data.date)
        setTime(response.data.time)
        setTimeZone(response.data.time_zone)
        setEventType(response.data.event_type)
        setEventVenue(response.data.event_venue)
        setEventVenueAddress(response.data.event_venue_address)
        setDescription(response.data.description)
        setCategory(response.data.category.id)
    }
    const getInterestCategories = async() => {
        const response = await api.get("interests/");
        setInterestCategories(response.data)
    };

    useEffect(() => {
        getEvent().then(getInterestCategories())
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
									value={event && event.category.id}
									onChange={(e) => setCategory(e.target.value)}>
									{event && interestCategories &&
										interestCategories.map((category) => (
											<option key={category.id} value={category.id} >
												{category.category}
											</option>
										))}
								</select>
							</Form.Label>
						</Form.Group>

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