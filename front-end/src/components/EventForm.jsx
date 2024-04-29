import { Form, Row, Col, Card, Button } from "react-bootstrap";
import LocationSearchMap from "./LocationSearchMap";
import { timeZoneAbbreviations } from "../utilities/EventUtilities";

function EventForm({
	title,
	eventStart,
	eventEnd,
	timeZone,
	eventType,
	eventVenue,
	eventVenueAddress,
	virtualEventLink,
	description,
	category,
	interestCategories,
	photoPreview,
	handleImageChange,
	onTitleChange,
	onEventStartChange,
	onEventEndChange,
	onTimeZoneChange,
	onEventTypeChange,
	onEventVenueChange,
	onEventVenueAddressChange,
	onVirtualLinkChange,
	onDescriptionChange,
	onCategoryChange,

    //updated code to pass the below props
    volunteersNeeded,
    attendeesNeeded,
    onVolunteersNeededChange,
    onAttendeesNeededChange,
	setLocation,
	setEventCoordinates,
	handleSubmit,
	setEventVenueAddress,

	apiCountries,
	apiStates,
	apiCities,
	stateAdd,
	locationData,
	setCountryAdd,
    setStateAdd,
    setCityAdd,
	handleAddLocation,
	handleRemoveLocation,

}) {
	const styles = {
		label: { fontWeight: "bold" },
	};
	// Handler to update event venue address and synchronize it with the location search map
	const handleLocationChange = (newAddress) => {
		onEventVenueAddressChange({ target: { value: newAddress } });
	};

	return (
		<Form onSubmit={handleSubmit} className="p-3">
			<Card className="shadow-sm">
				<Card.Header as="h5" className="text-white bg-dark">
					Event Details
				</Card.Header>
				<Card.Body>
					<Row>
						<Col sm={12} md={6}>
							<Form.Group className="mb-2" controlId="title">
								<Form.Label style={styles.label}>
									Enter an Event Title:{" "}
									<span style={{ fontStyle: "italic", fontWeight: "normal" }}>
										(ex. City Park Clean-up, Silent Auction Fundraiser for..)
									</span>
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter event title"
									value={title}
									onChange={onTitleChange}
								/>
							</Form.Group>

							<Form.Group className="mb-2" controlId="event_type">
								<Form.Label className="mt-2" style={styles.label}>
									Will the Event be In-person or Virtual?
								</Form.Label>
								<Form.Control
									as="select"
									value={eventType}
									onChange={onEventTypeChange}>
									<option value="In-person">In-person</option>
									<option value="Virtual">Virtual</option>
								</Form.Control>
							</Form.Group>
						</Col>

						<Col sm={12} md={6}>
							<Form.Group className="mb-2" controlId="date">
								<Form.Label style={styles.label}>Event Start Time:</Form.Label>
								<Form.Control
									type="datetime-local"
									value={eventStart}
									onChange={onEventStartChange}
								/>

								<Form.Label className="mt-3" style={styles.label}>
									Event End Time:
								</Form.Label>
								<Form.Control
									type="datetime-local"
									value={eventEnd}
									onChange={onEventEndChange}
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm={12} md={6}>
							{eventType === "Virtual" && (
								<Form.Group className="mb-2" controlId="virtual_event_link">
									<Form.Label className="mt-2" style={styles.label}>
										Enter the Virtual Event Link attendees will use to join your
										event:
									</Form.Label>
									<Form.Control
										type="url"
										placeholder="Enter virtual event link"
										value={virtualEventLink}
										onChange={onVirtualLinkChange}
									/>
								</Form.Group>
							)}

							{!eventType.includes("Virtual") && (
								<Row>
									<Form.Group className="mb-2" controlId="event_venue">
										<Form.Label className="mt-2">
											{" "}
											<span style={styles.label}>Event Venue:</span>{" "}
											<span style={{ fontStyle: "italic" }}>
												(ex. Westside Community Center, Memorial Park)
											</span>
										</Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter event venue"
											value={eventVenue}
											onChange={onEventVenueChange}
										/>
									</Form.Group>

									<Form.Group className="mb-2" controlId="event_venue_address">
										<Row>
											<Form.Label
												className="mt-2"
												style={{ fontWeight: "bold", marginBottom: "0" }}>
												Venue Address:{"  "}
												<span
													style={{ fontWeight: "normal", fontStyle: "italic" }}>
													(Enter address in search box below)
												</span>{" "}
											</Form.Label>
										</Row>
										<Row style={{ paddingLeft: "12px" }}>
											<Form.Control
												style={{
													fontStyle: "italic",
													marginTop: "0",
													paddingTop: "0",
												}}
												type="text"
												value={eventVenueAddress}
												plaintext
												readOnly
											/>
										</Row>
									</Form.Group>

									<Row className="mb-3" style={{ justifyContent: "center" }}>
										<LocationSearchMap
											setEventCoords={setEventCoordinates}
											setEventVenueAddress={handleLocationChange}
											setAddress={setEventVenueAddress}
											setLocation={setLocation}
										/>
									</Row>
								</Row>
							)}
							{eventType.includes("Virtual") && (
								<Form.Group className="mb-3" controlId="formLocationSearch">
								<Form.Label>
								  Country
								  <br />
								  <input
									name="country"
									placeholder="Country"
									type="text"
									list="countries-list" // Use the list attribute to associate with the datalist
									size={40}
									onChange={(e) => setCountryAdd(e.target.value)}
								  />
								  {/* Create a datalist with options from apiCountries */}
								  <datalist id="countries-list">
									{apiCountries.map((country, index) => (
									  <option key={index} value={country.name} />
									))}
								  </datalist>
								</Form.Label>
								<Form.Label>
								  Region/State
								  <br />
								  <input
									name="state"
									placeholder=" Region/State"
									type="text"
									list="states-list" // Use the list attribute to associate with the datalist
									size={40}
									value={stateAdd[1]} // Display only the state name
									onChange={(e) => {
									  const selectedState = apiStates.find(state => state.name === e.target.value);
									  setStateAdd(selectedState ? [selectedState.id, selectedState.name] : []);
									}}
								  />
								  {/* Create a datalist with options from apiStates */}
								  <datalist id="states-list">
									{apiStates.map((state, index) => (
									  <option key={index} value={state.name} />
									))}
								  </datalist>
								</Form.Label>
								<Form.Label>
								  City
								  <br />
								  <input
									name="city"
									placeholder="City"
									type="text"
									list="cities-list" // Use the list attribute to associate with the datalist
									size={40}
									onChange={(e) => setCityAdd(e.target.value)}
								  />
								  {/* Create a datalist with options from apiCities */}
								  <datalist id="cities-list">
									{apiCities.map((city, index) => (
									  <option key={index} value={city.name} />
									))}
								  </datalist>
								</Form.Label>
								{locationData.length == 0 ?
								  <p style={{fontStyle:'italic'}}>No locations set</p> :
									<Button size="sm" variant="danger" onClick={(e) => handleRemoveLocation()} >{`Remove ${locationData.city},  ${locationData.state}`}</Button>
								}
								<br />
								<Button variant="info" onClick={() => handleAddLocation()}> 
								Add Location
							  </Button>
							  </Form.Group>
							)}
						</Col>
						<Col sm={12} md={6}>
							<Form.Group className="mb-2" controlId="timeZone">
								<Form.Label className="mt-2" style={styles.label}>
									Event Timezone:
								</Form.Label>
								<Form.Control
									as="select"
									value={timeZone}
									onChange={onTimeZoneChange}>
									{timeZoneAbbreviations.map((tz, idx) => (
										<option key={idx} value={tz}>
											{tz}
										</option>
									))}
								</Form.Control>
							</Form.Group>

							<Form.Group className="mb-2" controlId="category">
								<Form.Label className="mt-2" style={styles.label}>
									Select a Category that best fits your event:
								</Form.Label>
								<Form.Control
									as="select"
									value={category}
									onChange={onCategoryChange}>
									{interestCategories.map((cat) => (
										<option key={cat.id} value={cat.id}>
											{cat.category}
										</option>
									))}
								</Form.Control>
							</Form.Group>
                            
                            <Row className="mt-3">
                            <Form.Group  controlId="eventManagementBooleans">
                            <Form.Label className="mt-2" style={styles.label}>Please click the corresponding checkboxes below if your event will need volunteers and/or event attendees:</Form.Label>

                            <Form.Check id="volunteersBoolean" type="checkbox" className="mt-3" style={{marginLeft:"30px"}}>
                            <Form.Check.Input 
                                isValid
                                type="checkbox"
                                checked={volunteersNeeded}
                                onChange={onVolunteersNeededChange}
                            />
                            <Form.Check.Label style={styles.label}>My event requires volunteers.</Form.Check.Label>
                            <Row>
                            {volunteersNeeded && (<Form.Text>Volunteers it is! Once you submit this event you&apos;ll be able to manage your volunteer needs on your Event Admin Page.</Form.Text>)}
                            </Row>
                            </Form.Check>
                            
                            <Form.Check id="attendeesBoolean" type="checkbox" className="mt-3" style={{marginLeft:"30px"}}>
                            <Form.Check.Input 
                                isValid
                                type="checkbox"
                                checked={attendeesNeeded}
                                onChange={onAttendeesNeededChange}
                            />

                            <Form.Check.Label style={styles.label}>My event requires event attendees.</Form.Check.Label>
                            <Row>
                            {attendeesNeeded && (<Form.Text>You got it! As soon as you submit this event other ChangeMate users will be able to view the details and RSVP!</Form.Text>)}
                            </Row>
                            </Form.Check>
                            </Form.Group>
                            </Row>
						</Col>
					</Row>

                    <Form.Group className="mb-2" controlId="description">
								<Form.Label className="mt-3" style={styles.label}>
									Enter a brief description about your event and why others
									should attend:
								</Form.Label>
								<Form.Control
									as="textarea"
									rows={8}
									placeholder="Describe your event"
									value={description}
									onChange={onDescriptionChange}
								/>
							</Form.Group>

					<Form.Group controlId="eventImage" className="mb-3">
						<Form.Label className="mt-3" style={styles.label}>
							Event Image:
						</Form.Label>
						<Form.Control
							type="file"
							accept="image/*"
							onChange={handleImageChange}
						/>
						{photoPreview && (
							<img
								src={photoPreview}
								alt="Event Preview"
								className="img-fluid mt-3"
							/>
						)}
					</Form.Group>
				</Card.Body>
			</Card>
		</Form>
	);
}

export default EventForm;
