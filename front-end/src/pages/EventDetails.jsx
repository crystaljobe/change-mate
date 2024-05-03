import { Container, Col, Row, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import "add-to-calendar-button";
import { getEventDetails, setUserAttending } from "../utilities/EventUtilities";
import { getiCalEventDetails } from "../utilities/EventUtilities";
import DetailedEventCard from "../components/DetailedEventCard";
import VolunteerApplication from "../components/VolunteerApplication";
import StaticMap from "../components/EventDetailsStaticMap";

export default function EventDetails() {
  let { eventID } = useParams();
  const { userProfileData } = useOutletContext();
  const [iCalDetails, setiCalDetails] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);

  //consolidated useEffects on page and only recall api if event id changes
  useEffect(() => {
    //only fetch data once 
    if(!eventDetails){ 
      async function fetchAllData() {
        try {
          //get and set event details and iCal details
            const event = await getEventDetails(eventID);
            const iCal = await getiCalEventDetails(eventID);
            setEventDetails(event);
            setiCalDetails(iCal);
            // console.log("fetching and setting")
        } catch (error) {
          console.error(error);
        }
      };
    fetchAllData();
    };
  }, [eventID]);

  // onClick function for RSVP button to handle put request to add user as attending
  const handleRSVP = async () => {
    const rsvp = await setUserAttending(eventID);
    if (rsvp) {
      console.log("user rsvp")
    }

  };
  
  // Checks the events that the user is attending for id match with the eventID for this page
  // const isUserAttending = () => {
  //   // Checks if eventsAttending has data
  //   if(eventsAttending) {
  //     // Loops through the events
  //     for (const event of eventsAttending) {
  //       // Makes comparison between the page's eventID and the user's event.id
  //       if (eventID == event.id) {
  //         // If match user is RSVPed
  //         return true
  //       }
  //     }
  //   } else {
  //     return false
  //   }
  // };

  // Renders button conditionally based on if user is attending event
  const renderAttendingButton = () => {
    // Sets attending to true or false based on function call
    const attending = true;
  
    //converted from button into a-tags for dropdown item
     return (   
    attending ? (
      <a>Attending</a>
    ) : (
      <a onClick={handleRSVP}>Attend This Event</a>
    ))
  
  };


  //application modal
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  if (eventDetails) {
     // destructure event details set props with null value to default value
    const {
      description,
      title,
      startTime,
      startDate,
      endTime,
      endDate,
      time_zone,
      event_type,
      virtual_event_link = false,
      event_venue = false,
      event_venue_address = false,
      category: { category },
      hosts,
      event_photo = false,
      location,
      lat,
      lon,
      attendees_needed,
      volunteer_roles = [],
      num_users_attending = 0,
      volunteer_spots_remaining = 0,
    } = eventDetails; 
    return (
      <Container>
        <Row>
          <Col md={8} sm={12}>
            {console.log(eventDetails)}

              <DetailedEventCard
                description={description}
                title={title}
                startTime={startTime}
                startDate={startDate}
                endTime={endTime}
                endDate={endDate}
                time_zone={time_zone}
                event_type={event_type}
                virtual_event_link={virtual_event_link}
                event_venue={event_venue}
                event_venue_address={event_venue_address}
                category={category.category}
                num_users_attending={num_users_attending}
                volunteer_spots_remaining={volunteer_spots_remaining}
                hosts={hosts}
                event_photo={event_photo}
                lat={lat}
                lon={lon}
                >
                </DetailedEventCard>

            <div className="dropdown-container">
              <button className="dropdown-button">Count me in!</button>
              <div className="dropdown-content">
                {/* TODO: add conditonal rendering for volunteer option if event is accepting volunteers */}
                {/* added volunteer application modal as a component */}
                {/* <a onClick={handleShow}>Volunteer</a>
                <VolunteerApplication
                  show={show}
                  handleClose={handleClose}
                  eventID={eventID}
                /> */}

                {/* if event needs attendees */}
                  {eventDetails.attendees_needed ?
                    renderAttendingButton() 
                    : null
                  }

                <Link
                  to={`/eventCollab/${eventID}`}
                  className="btn btn-primary mr-2">
                  Let's Collaborate!
                </Link>
                <Link to="/eventadmin" className="btn btn-primary">
                  Admin Time!
                </Link>
              </div>
            </div>
          </Col>

          {/*Map displaying event location */}
          <Col md={4} sm={12} className="text-center">
            <br />
            {eventDetails.event_type === "In-person" && (
              <Row className="justify-content-center">
                {eventDetails.lat && (
                  <StaticMap lat={eventDetails.lat} lng={eventDetails.lon} />
                )}

                <Link to="/eventdirections">
                  <button
                    className="button-gradient text-center"
                    variant="info"
                    style={{ width: "90vw", maxWidth: "300px" }}>
                    Get Event Directions
                  </button>
                </Link>
              </Row>
            )}

            {/* add to calendar button */}
            <add-to-calendar-button
              style={{ height: "50px" }}
              size="5"
              label="Add to Calendar"
              options="'Apple','Google','iCal','Outlook.com','Microsoft 365','Microsoft Teams','Yahoo'"
              name={iCalDetails.title}
              location={
                eventDetails.event_type === "Virtual"
                  ? eventDetails.virtual_event_link
                  : `${eventDetails.event_venue} - ${eventDetails.event_venue_address}`
              }
              startDate={iCalDetails.startDate}
              endDate={iCalDetails.endDate}
              startTime={iCalDetails.startTime}
              endTime={iCalDetails.endTime}
              timeZone={iCalDetails.time_zone}
              description={iCalDetails.description}></add-to-calendar-button>

          </Col>
        </Row>
      </Container>
    );
  }
}
