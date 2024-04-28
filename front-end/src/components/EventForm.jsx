import { Form, Row, Col, Card } from 'react-bootstrap';
import LocationSearchMap from './LocationSearchMap';
import { timeZoneAbbreviations } from '../utilities/EventUtilities';

function EventForm({
    title, eventStart, eventEnd, timeZone, eventType, eventVenue,
    eventVenueAddress, virtualEventLink, description, category,
    interestCategories, photoPreview, handleImageChange,
    onTitleChange, onEventStartChange, onEventEndChange, onTimeZoneChange,
    onEventTypeChange, onEventVenueChange, onEventVenueAddressChange,
    onVirtualLinkChange, onDescriptionChange, onCategoryChange,
    setLocation, setEventCoordinates,  handleSubmit, setEventVenueAddress
}) {

    const styles = {
        "label" : {fontWeight: "bold"}, 
    }
    // Handler to update event venue address and synchronize it with the location search map
    const handleLocationChange = (newAddress) => {
        onEventVenueAddressChange({ target: { value: newAddress } });
    };

    return (
        <Form onSubmit={handleSubmit} className="p-3">
            <Card className="shadow-sm">
                <Card.Header as="h5" className="text-white bg-dark">Event Details</Card.Header>
                <Card.Body>
                    <Row >
                        <Col sm={12} md={6}>
                            <Form.Group className="mb-2" controlId="title">
                                <Form.Label style={styles.label}>Event Title:</Form.Label>
                                <Form.Control type="text" placeholder="Enter event title" value={title} onChange={onTitleChange} />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="event_type">
                                <Form.Label className="mt-2" style={styles.label}>Event Type:</Form.Label>
                                <Form.Control as="select" value={eventType} onChange={onEventTypeChange}>
                                    <option value="In-person">In-person</option>
                                    <option value="Virtual">Virtual</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col sm={12} md={6}>
                            <Form.Group className="mb-2" controlId="date">
                                <Form.Label style={styles.label}>Event Start Time:</Form.Label>
                                <Form.Control type="datetime-local" value={eventStart} onChange={onEventStartChange} />
                                
                                <Form.Label className="mt-3" style={styles.label}>Event End Time:</Form.Label>
                                <Form.Control type="datetime-local" value={eventEnd} onChange={onEventEndChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12} md={6}>
                            {eventType === "Virtual" && (
                                <Form.Group className="mb-2" controlId="virtual_event_link">
                                    <Form.Label className="mt-2" style={styles.label}>Virtual Event Link:</Form.Label>
                                    <Form.Control type="url" placeholder="Enter virtual event link" value={virtualEventLink} onChange={onVirtualLinkChange} />
                                </Form.Group>
                            )}

                            {!eventType.includes("Virtual") && (
                            <Row >
                                <Form.Group className="mb-2" controlId="event_venue">
                                    <Form.Label className="mt-2" style={styles.label}>Event Venue:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter event venue" value={eventVenue} onChange={onEventVenueChange} />
                                </Form.Group>

                                <Row className='mb-1.5'>
                                    <Form.Label className="mt-2" style={styles.label}>Event venue address:</Form.Label>
                                    <LocationSearchMap
                                        setEventCoords={setEventCoordinates}
                                        setEventVenueAddress={handleLocationChange}
                                        setAddress={setEventVenueAddress}
                                        setLocation={setLocation}
                                    />
                                </Row>

                                <Form.Group className="mb-2" controlId="event_venue_address">
                                    {/* <Form.Label >Selected Address:</Form.Label> */}
                                    <Form.Control type="text"  value={eventVenueAddress} readOnly/>
                                </Form.Group>
                            </Row>
                            )}
                        </Col>

                        <Col sm={12} md={6}>
                            <Form.Group className="mb-2" controlId="timeZone">
                                <Form.Label className="mt-2" style={styles.label}>Event Timezone:</Form.Label>
                                <Form.Control as="select" value={timeZone} onChange={onTimeZoneChange}>
                                    {timeZoneAbbreviations.map((tz, idx) => <option key={idx} value={tz}>{tz}</option>)}
                                </Form.Control>
                            </Form.Group>


                            <Form.Group className="mb-2" controlId="category">
                                <Form.Label className="mt-2" style={styles.label}>Event Category:</Form.Label>
                                <Form.Control as="select" value={category} onChange={onCategoryChange}>
                                    {interestCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.category}</option>)}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-2"  controlId="description">
                            <Form.Label className="mt-2" style={styles.label}>Description:</Form.Label>
                            <Form.Control as="textarea" rows={10} placeholder="Describe your event" value={description} onChange={onDescriptionChange} />
                        </Form.Group>
                        </Col>

                    </Row>

                    <Form.Group controlId="eventImage" className="mb-3">
                        <Form.Label className="mt-3" style={styles.label}>Event Image:</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                        {photoPreview && <img src={photoPreview} alt="Event Preview" className="img-fluid mt-3" />}
                    </Form.Group>

                </Card.Body>
            </Card>
        </Form>
    );
}

export default EventForm;