import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import LocationSearchMap from './LocationSearchMap';

function EventForm({
    title, eventStart, eventEnd, timeZone, eventType, eventVenue,
    eventVenueAddress, virtualEventLink, description, category,
    interestCategories, photoPreview, handleImageChange,
    onTitleChange, onEventStartChange, onEventEndChange, onTimeZoneChange,
    onEventTypeChange, onEventVenueChange, onEventVenueAddressChange,
    onVirtualLinkChange, onDescriptionChange, onCategoryChange,
    setLocation, setEventCoordinates, timeZoneAbbreviations, handleSubmit, setEventVenueAddress
}) {
    // Handler to update event venue address and synchronize it with the location search map
    const handleLocationChange = (newAddress) => {
        onEventVenueAddressChange({ target: { value: newAddress } });
    };

    return (
        <Form onSubmit={handleSubmit} className="p-3">
            <Card className="shadow-sm">
                <Card.Header as="h5" className="text-white bg-dark">Event Details</Card.Header>
                <Card.Body>
                    <Row className="mb-3">
                        <Col sm={12} md={6}>
                            <Form.Group controlId="title">
                                <Form.Label>Event Title:</Form.Label>
                                <Form.Control type="text" placeholder="Enter event title" value={title} onChange={onTitleChange} />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="date">
                                <Form.Label>Event Start Time:</Form.Label>
                                <Form.Control type="datetime-local" value={eventStart} onChange={onEventStartChange} />
                                <Form.Label className="mt-2">Event End Time:</Form.Label>
                                <Form.Control type="datetime-local" value={eventEnd} onChange={onEventEndChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col sm={12} md={6}>
                            <Form.Group controlId="timeZone">
                                <Form.Label>Event Timezone:</Form.Label>
                                <Form.Control as="select" value={timeZone} onChange={onTimeZoneChange}>
                                    {timeZoneAbbreviations.map((tz, idx) => <option key={idx} value={tz}>{tz}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="event_type">
                                <Form.Label>Event Type:</Form.Label>
                                <Form.Control as="select" value={eventType} onChange={onEventTypeChange}>
                                    <option value="In-person">In-person</option>
                                    <option value="Virtual">Virtual</option>
                                </Form.Control>
                            </Form.Group>
                            {eventType === "Virtual" && (
                                <Form.Group controlId="virtual_event_link">
                                    <Form.Label>Virtual Event Link:</Form.Label>
                                    <Form.Control type="url" placeholder="Enter virtual event link" value={virtualEventLink} onChange={onVirtualLinkChange} />
                                </Form.Group>
                            )}
                        </Col>
                    </Row>
                    {!eventType.includes("Virtual") && (
                        <Row className="mb-3">
                            <Col sm={12} md={4}>
                                <Form.Group controlId="event_venue">
                                    <Form.Label>Event Venue:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter event venue" value={eventVenue} onChange={onEventVenueChange} />
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={4}>
                                <Form.Group controlId="event_venue_address">
                                    <Form.Label>Event Location:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter or select event location" value={eventVenueAddress} onChange={onEventVenueAddressChange} />
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={4}>
                                <p>Feel free to use the plug-in below to set event location</p>
                                <LocationSearchMap
                                    setEventCoords={setEventCoordinates}
                                    setEventVenueAddress={handleLocationChange}
                                    setAddress={setEventVenueAddress}
                                    setLocation={setLocation}
                                />
                            </Col>
                        </Row>
                    )}
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Describe your event" value={description} onChange={onDescriptionChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Event Category:</Form.Label>
                        <Form.Control as="select" value={category} onChange={onCategoryChange}>
                            {interestCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.category}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="eventImage" className="mb-3">
                        <Form.Label>Event Image:</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                        {photoPreview && <img src={photoPreview} alt="Event Preview" className="img-fluid mt-3" />}
                    </Form.Group>
                </Card.Body>
            </Card>
        </Form>
    );
}

export default EventForm;