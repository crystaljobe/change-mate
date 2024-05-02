import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, CardGroup, Image } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react'; // Import the FullCalendar component
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin to display the calendar in a day grid view
import { getNounIcon } from '../utilities/DefaultIconsUtilities';


// Define the UserProfile component which accepts a user prop
export default function UserProfile() {
  // Use the OutletContext to get userProfileData and its setter function
  const { userProfileData } = useOutletContext();

  // State variables to hold various user and events related data
  const [eventsAttending, setEventsAttending] = useState(userProfileData.events_attending);
  const [userEvents, setUserEvents] = useState(userProfileData.userEvents);
  // const [eventsVolunteering, setEventsVolunteering] = useState(userProfileData.events_volunteering);
  const [profileIcon, setProfileIcon] = useState("");
  const [eventIcon, setEventIcon] = useState("");
  const [eventsCreatedIcon, setEventsCreatedIcon] = useState("");
  const [eventsCommitedToIcon, setEventsCommitedToIcon] = useState("");
  const [eventsVolunteeredIcon, setEventsVolunteeredIcon] = useState("");

  console.log('userProfileData', userProfileData)

  useEffect(() => {
    if (!userProfileData.image) {
      fetchDefaultProfileIcon();
    };
    fetchEventIcon()
    fetchEventsCreatedIcon()
    fetchEventsCommitedToIcon()
    fetchEventsVolunteeredIcon()
  }, [userProfileData]);

  // Join user interests array into a string for display
  function userInterestStr() {
    let interestsArr = userProfileData.interests.map(cat => cat.category);
    let userIntStr = interestsArr.join(', ')
    return userIntStr
  }

  // Fetches default event icon
  const fetchEventIcon = async () => {
    const icon = await getNounIcon(5130800)
    setEventIcon(icon)
  }

  const fetchEventsCreatedIcon = async () => {
    const icon = await getNounIcon(2532350)
    setEventsCreatedIcon(icon)
  }

  const fetchEventsCommitedToIcon = async () => {
    const icon = await getNounIcon(6651904)
    setEventsCommitedToIcon(icon)
  }

  const fetchEventsVolunteeredIcon = async () => {
    const icon = await getNounIcon(6763364)
    setEventsVolunteeredIcon(icon)
  }

  const fetchDefaultProfileIcon = async () => {
    const profileIcon = await getNounIcon(4091300);
    setProfileIcon(profileIcon)
  };

  // Map events attending to the format required by FullCalendar
const calendarEvents = userEvents.map(event => {
  // console.log(`Event Start: ${event.event_start}, Event End: ${event.event_end}`);  // Add this line
  return {
    title: event.title,
    start: event.event_start,
    end: event.event_end,
    id: event.id,
  };
});

  // Function to render user's profile information using Card component
  const renderProfileInfo = () => (
    <Card className="text-center" style={{ width: '18rem' }}>
      <Card.Header>Profile Info</Card.Header>
      {/* Display user photo or a default icon if photo is not available */}
      <Card.Img variant="top" src={userPhoto || profileIcon} style={{ height: '250px' }} alt={`${userProfileData.display_name}'s photo`} />
      <Card.Body>
        <Card.Title as='h3' style={{ fontWeight: 'bold', color: "#6840DF", textDecoration: 'underline' }}>
          {userProfileData.display_name}
        </Card.Title>
        <br />
        <Card.Subtitle as='h4' style={{ fontWeight: 'bold' }}>Locations:</Card.Subtitle>
        {/* <Card.Text>
          {userProfileData.location}
        </Card.Text> */}
        <Card.Subtitle as='h4' style={{ fontWeight: 'bold' }}>Interests:</Card.Subtitle>
        <Card.Text>
          {userInterestStr}
        </Card.Text>
        <Button variant="info" as={Link} to={'/editprofile'}>
          Edit Profile
        </Button>
      </Card.Body>
    </Card>
  );


  // Main component layout using Bootstrap's grid system
  if (userProfileData) {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md={3}>
          {renderProfileInfo()}
          <br/>
          <Card className="text-center" style={{ width: '18rem' }}>
            <Card.Header>Badges</Card.Header>
            <Card.Body>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Image src={eventsCreatedIcon} rounded style={{ height: '40px' , marginRight: '5px'}}/>
                <Card.Text>
                  {userProfileData.user_events.length} Events Created
                </Card.Text>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Image src={eventsCommitedToIcon} rounded style={{ height: '40px' , marginRight: '5px'}}/>
                <Card.Text>
                  {userProfileData.events_attending.length} Events Commited To
                </Card.Text>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Image src={eventsVolunteeredIcon} rounded style={{ height: '40px' , marginRight: '5px'}}/>
                <Card.Text>
                  {userProfileData.events_volunteering.length} Events Volunteered For
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <h1 style={{ color: "#6840DF" }}>Events You're Hosting</h1>
          <Row>
            {userEvents.length === 0 ? (
              <h3 style={{ fontStyle: "italic" }}>
                Doesn't look like you have any events you're collaborating on
                at this time
              </h3>
            ) : (
              userEvents.map((event) => (
                <CardGroup key={event.id} className="p-2">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{event.title}</Card.Title>

                      {/* Conditional rendering of event photo; If event has photo, render that; If no photo, render default event icon */}

                      <Card.Img
                        variant="top"
                        src={
                          (event.event_photo && event.event_photo) ||
                          eventIcon
                        }
                        style={{ height: "200px", width: "200px" }}
                        alt={`${event.title}'s photo`}
                      />

                      <Card.Text>
                        <strong> When: </strong>{" "}
                        {` ${event.startDate} at ${event.startTime} -- ${event.endDate} at ${event.endTime}`}
                        <br />
                        <strong>Event Type: </strong> {event.event_type}
                        <br />
                        {event.event_type === "Virtual" ? null : (
                          <>
                            <strong>Location: </strong>
                            {event.event_venue}
                          </>
                        )}
                      </Card.Text>

                      <Button
                        style={{ margin: 3 }}
                        variant="info"
                        as={Link}
                        to={`/editevent/${event.id}`}
                      >
                        Edit Event Details
                      </Button>

                      <Button
                        style={{ margin: 3 }}
                        variant="info"
                        as={Link}
                        to={`/event/${event.id}`}
                      >
                        View Event Details
                      </Button>
                    </Card.Body>
                  </Card>
                </CardGroup>
              ))
            )}
          </Row>
          <Row>
            <Button variant="primary" as={Link} to="/createevent">
              Create New Event
            </Button>
          </Row>
          <br />

          <h1 style={{ color: "#6840DF" }}>Events You're Attending</h1>
          <br />
          <Row>
            {eventsAttending.length > 0 ? (
              eventsAttending.map((event) => (
                <CardGroup key={event.id} className="p-2">
                  <Card key={event.id} style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{event.title}</Card.Title>

                      {/* Conditional rendering of event photo; If event has photo, render that; If no photo, render default event icon */}
                      <Card.Img
                        variant="top"
                        src={
                          (event.event_photo && event.event_photo) ||
                          eventIcon
                        }
                        style={{ height: "200px", width: "200px" }}
                        alt={`${event.title}'s photo`}
                      />

                      <Card.Text>
                        <strong> When: </strong>{" "}
                        {` ${event.startDate} at ${event.startTime} -- ${event.endDate} at ${event.endTime}`}
                        <br />
                        <strong>Event Type: </strong> {event.event_type}
                        <br />
                        {event.event_type === "Virtual" ? null : (
                          <>
                            <strong>Location: </strong>
                            {event.event_venue}
                          </>
                        )}
                      </Card.Text>

                      <Button
                        variant="info"
                        as={Link}
                        to={`/event/${event.id}`}
                      >
                        View Event Details
                      </Button>
                    </Card.Body>
                  </Card>
                </CardGroup>
              ))
            ) : (
              <h3 style={{ fontStyle: "italic" }}>
                Doesn't look like you've RSVP'd to any events yet.
              </h3>
            )}
          </Row>
          <Row>
            <Button variant="primary" as={Link} to="/events">
              I'm ready to make a difference!
            </Button>
          </Row>
        </Col>
        <Col md={5}>
          {/* FullCalendar component for displaying events in a monthly grid */}
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
          />
        </Col>
      </Row>
    </Container>
  );
}
}