import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AddressAutofill } from "@mapbox/search-js-react";
import { getInterestCategories } from "../utilities/InterestCategoriesUtilities";
import { postEventDetails } from "../utilities/EventUtilities";

export default function CreateEvent() {
  // set const for useNavigate
  const navigate = useNavigate()
  // set interest categories for users to select from 
  const [interestCategories, setInterestCategories] = useState([]);
  // set all event details useState
  // event title 
  const [title, setTitle] = useState("");
  // event start date/time
  const [eventStart, setEventStart] = useState("");
  // event end date/time
  const [eventEnd, setEventEnd] = useState("");
  // time zone options below in code
  const [timeZone, setTimeZone] = useState("");
  // event type = In-person or Virtual
  const [eventType, setEventType] = useState("In-Person");
  // event virtual link if a virtual event (ex. - user will input their zoom link)
  const [virtualEventLink, setVirtualEventLink] = useState("");
  // event in-person venue ex-"Downtown Park Center"
  const [eventVenue, setEventVenue] = useState("");
  // event details text
  const [description, setDescription] = useState("");
  // event category for search functionality (only one cat per event)
  const [category, setCategory] = useState("");
  const [eventPhoto, setEventPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  // eventVenueAddress = full address "123 Example St, City, St Zip"
  const [eventVenueAddress, setEventVenueAddress] = useState("");
  // eventLocation format = "city, state"
  const [location, setLocation] = useState("");

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Ensures it is a valid base64 format for the image
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        setPhotoPreview(reader.result);
        setEventPhoto(base64String);  
      };
      reader.readAsDataURL(file);
    }
  };

  // on submit check all forms are field in and call post event
  function handleSubmit(e) {

    console.log("Create Event PAGE", {
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
    });

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
    let responseStatus = await postEventDetails(
      title,
      eventStart,
      eventEnd,
      timeZone,
      eventType,
      eventVenue,
      eventVenueAddress,
      description,
      category,
      eventPhoto
    );

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
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option selected={true}>In-person</option>
                  <option>Virtual</option>
                </select>
              </Form.Label>
            </Form.Group>

            {eventType === "Virtual" ? (
              <Form.Group className="mb-3" controlId="virtual_event_link">
                <Form.Label>
                  Virtual Event Link: {" "}
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
                </Form.Group>{" "}
              </>
            )}

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>
                Tell others about your event & why they should join: {"	"}
                <br></br>
                <textarea
                  type="text"
                  rows={8}
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
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {interestCategories &&
                    interestCategories.map((category) => (
                      <option key={category.id} value={parseInt(category.id)}>
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