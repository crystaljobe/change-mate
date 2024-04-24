import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AddressAutofill } from "@mapbox/search-js-react";
import { getInterestCategories } from "../utilities/InterestCategoriesUtilities";
import { deleteEvent, getEventDetails, updateEventDetails } from "../utilities/EventUtilities";

export default function EditEventDetails() {
  let { eventID } = useParams();
  const navigate = useNavigate();
  const [interestCategories, setInterestCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [event, setEvent] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventVenueAddress, setEventVenueAddress] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [eventPhoto, setEventPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [virtualEventLink, setVirtualEventLink] = useState("");

  //timezone abbreviations array:
  const timeZoneAbbreviations = [
    "America/Adak",
    "America/Anchorage",
    "America/Chicago",
    "America/Denver",
    "America/Halifax",
    "America/Los_Angeles",
    "America/New_York",
    "America/Noronha",
    "America/St_Johns",
    "Asia/Bangkok",
    "Asia/Dhaka",
    "Asia/Dubai",
    "Asia/Istanbul",
    "Asia/Kabul",
    "Asia/Karachi",
    "Asia/Kathmandu",
    "Asia/Kolkata",
    "Asia/Tehran",
    "Atlantic/Azores",
    "Europe/Kiev",
    "Europe/Lisbon",
    "Europe/London",
    "Europe/Moscow",
    "Europe/Paris",
    "GMT",
    "Pacific/Honolulu",
    "Pacific/Niue",
  ];

  // get interest cats and set them
  const eventInterestCategories = async () => {
    const categories = await getInterestCategories();
    setInterestCategories(categories);
  };

  // get event details using utility function and set all data
  const getEvent = async () => {
    const eventDetails = await getEventDetails(eventID);
    console.log(eventDetails);
    setEvent(eventDetails);
    setTitle(eventDetails.title);
    setEventStart(eventDetails.eventStart);
    setEventEnd(eventDetails.eventEnd);
    setTimeZone(eventDetails.time_zone);
    setEventType(eventDetails.event_type);
    setEventVenue(eventDetails.event_venue);
    setEventVenueAddress(eventDetails.event_venue_address);
    setDescription(eventDetails.description);
    setCategory(eventDetails.category.id);
    setPhotoPreview(eventDetails.event_photo);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setEventPhoto(reader.result);  
      };
      reader.readAsDataURL(file);
    }
  };

  // update event details in BE using utility function
  const updateEvent = async () => {
    //changed date --> eventStart & time --> eventEnd
    let responseStatus = await updateEventDetails(
      eventID,
      title,
      eventStart,
      eventEnd,
      timeZone,
      eventType,
      eventVenue || '',  // Ensure non-null
      eventVenueAddress || '',  // Ensure non-null
      description || '',  // Ensure non-null
      category,
      eventPhoto,  // Already adjusted to send as base64 string
      virtualEventLink || ''  // Ensure non-null and proper URL or empty
    );
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
  };
  
  // upon submit prevent default and call on update event funct
  function handleSubmit(e) {
    console.log("Edit Event PAGE", {
      "title": title,
      "event_start": eventStart,
      "event_end": eventEnd,
      "time_zone": timeZone,
      "event_type": eventType,
      "event_venue": eventVenue,
      "event_venue_address": eventVenueAddress,
      "description": description,
      "category": category,
      "event_photo": eventPhoto,
      "virtual_event_link": virtualEventLink
    });
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
                Event Start time: {"	"}
                <input
                  type="datetime-local"
                  size={40}
                  value={eventStart}
                  onChange={(e) => setEventStart(e.target.value)}
                />
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>
                Event End time: {"	"}
                <input
                  type="datetime-local"
                  size={40}
                  value={eventEnd}
                  onChange={(e) => setEventEnd(e.target.value)}
                />
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="timeZone">
              <Form.Label>
                Enter your event&apos;s timezone: {"	"}
                <select
                  size={2}
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                >
                  {timeZoneAbbreviations.map((timeZone, idx) => {
                    return <option key={idx}>{timeZone}</option>;
                  })}
                </select>
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="event_type">
              <Form.Label>
                Will the event be in-person or virtual?
                <br />
                <select
                  size={2}
                  //   changed this: event && event.event_type
                  value={event && eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="In-person">In-person</option>
                  <option value="Virtual">Virtual</option>
                </select>
              </Form.Label>
            </Form.Group>

            {eventType === "Virtual" ? (
              <Form.Group className="mb-3" controlId="virtual_event_link">
                <Form.Label>
                  Virtual Event Link:{" "}
                  <input
                    type="text"
                    size={30}
                    value={virtualEventLink}
                    onChange={(e) => setVirtualEventLink(e.target.value)}
                  />
                </Form.Label>
              </Form.Group>
            ) : (
              <>
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
              </>
            )}

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>
                Tell others about your event and why they should join:
                <textarea
                  type="text"
                  rows={8}
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
                  onChange={(e) => setCategory(e.target.value)}
                >
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

            <Form.Group className="mb-3" controlId="eventImage">
              <Form.Label>Event Image:</Form.Label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Event Preview"
                  style={{ width: "100%", marginTop: "10px" }}
                />
              )}
            </Form.Group>

            <Button
              variant="danger"
              type="button"
              onClick={deleteEntireEvent}
              style={{ marginRight: "10px" }}
            >
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
