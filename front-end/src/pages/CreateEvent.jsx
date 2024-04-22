import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AddressAutofill } from "@mapbox/search-js-react";
import { getInterestCategories } from "../utilities/InterestCategoriesUtilities";
import { postEventDetails } from "../utilities/EventUtilities";

export default function CreateEvent() {
    const navigate = useNavigate()
	const [interestCategories, setInterestCategories] = useState([]);
    const [title, setTitle] = useState("")
	const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [timeZone, setTimeZone] = useState("")
    const [eventType, setEventType] = useState("")
    const [eventVenue, setEventVenue] = useState("")
    const [eventVenueAddress, setEventVenueAddress] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")

    
	// get interest cats and set them 
	const eventInterestCategories = async () => {
		const categories = await getInterestCategories();
		setInterestCategories(categories);
	};

	// on submit check all forms are field in and call post event
	function handleSubmit(e) {
        e.preventDefault();
        for (let i = 0; i < 5; i++) {
            if (e.target[i].value == "") {
                alert(`Must enter a ${e.target[i].type}!!`)
                return
            }
        }
        postEvent()
	}

	// use utility func to post new event if response true nav to profile
	const postEvent = async () => {
		let responseStatus = await postEventDetails(title, date, time, timeZone, eventType, eventVenue, eventVenueAddress, description, category)
		if (responseStatus) {
			navigate("/profile");
		} 
	};

	// use effect to call event interest cats funct upon render
	useEffect(() => {
		eventInterestCategories();
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
									value={title}
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
									value={date}
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
									value={time}
									onChange={(e) => setTime(e.target.value)}
								/>
							</Form.Label>
						</Form.Group>

						<Form.Group className="mb-3" controlId="timeZone">
							<Form.Label>
								Enter your event&apos;s timezone:
								<input
									type="text"
									size={40}
									value={timeZone}
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
									value={eventType}
									onChange={(e) => setEventType(e.target.value)}>
									<option>Virtual</option>
									<option>In-person</option>
								</select>
							</Form.Label>
						</Form.Group>

						<Form.Group className="mb-3" controlId="event_venue">
							<Form.Label>
								Event Venue:
								<input
									type="text"
									size={40}
									value={eventVenue}
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
										value={eventVenueAddress}
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
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</Form.Label>
						</Form.Group>

						<Form.Group className="mb-3" controlId="category">
							<Form.Label>
								Select only one event category:
								<select
									size={6}
									value={category}
									onChange={(e) => setCategory(e.target.value)}>
									{interestCategories &&
										interestCategories.map((category) => (
											<option key={category.id} value={category.id}>
												{category.category}
											</option>
										))}
								</select>
							</Form.Label>
						</Form.Group>

						<Button variant="info" type="submit">
							Create Event
						</Button>
					</Form>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
}
