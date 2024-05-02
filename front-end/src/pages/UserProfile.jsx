import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, CardGroup, Image } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react'; // Import the FullCalendar component
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin to display the calendar in a day grid view
import { getNounIcon } from '../utilities/DefaultIconsUtilities';
import UserProfileInfoCard from "../components/UserProfileInfoCard";



// Define the UserProfile component which accepts a user prop
export default function UserProfile() {
  // Use the OutletContext to get userProfileData and its setter function
  const { userProfileData } = useOutletContext();

  // State variables to hold various user and events related data
  const [profileIcon, setProfileIcon] = useState("");
  const [eventIcon, setEventIcon] = useState("");
  const [badges, setBadges] = useState({})
  const [calendarEvents, setCalendarEvents] = useState([]);
 


  useEffect(() => {
    const fetchIcons = async () => {
      try {
        if (!profileIcon) {
          const iconData = await getNounIcon(4091300);
          setProfileIcon(iconData);
        }
        if (!eventIcon) {
          const eventIconData = await getNounIcon(5130800);
          setEventIcon(eventIconData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    fetchIcons();
    console.log("Fetching icons")
  }, [profileIcon, eventIcon]);

  const fetchBadges = useMemo(async () => {
    console.log("Fetching badges")
    const icons = await Promise.all([
      getNounIcon(2532350),
      getNounIcon(6651904),
      getNounIcon(6763364)
    ]);
    return {
      hostIcon: icons[0],
      commitIcon: icons[1],
      volunteerIcon: icons[2]
    };
    
  }, []);

  useEffect(() => {
    if (userProfileData.events_attending) {
      const calendarEvents = userProfileData.events_attending.map(event => ({
        title: event.title,
        start: event.event_start,
        end: event.event_end,
        id: event.id,
      }));
      setCalendarEvents(calendarEvents);
      fetchBadges.then(icons => setBadges(icons)); // Call fetchBadges as a promise
    }
    console.log("Fetching calendar events")
  }, [userProfileData, fetchBadges]);




  // Main component layout using Bootstrap's grid system
  if (userProfileData) {
  return (
    <Container fluid>
      {userProfileData.id && <Row className="justify-content-md-center">
        <Col md={3}>
          {userProfileData && <UserProfileInfoCard {...userProfileData} profileIcon={profileIcon} />}
          <br/>
          <Card className="text-center" style={{ width: '18rem' }}>
            <Card.Header>Badges</Card.Header>
            <Card.Body>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Image src={badges['hostIcon']} rounded style={{ height: '40px' , marginRight: '5px'}}/>
                <Card.Text>
                  {userProfileData.user_events.length} Events Created
                </Card.Text>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Image src={badges["commitIcon"]} rounded style={{ height: '40px' , marginRight: '5px'}}/>
                <Card.Text>
                  {userProfileData.events_attending.length} Events Commited To
                </Card.Text>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Image src={badges["volunteerIcon"]} rounded style={{ height: '40px' , marginRight: '5px'}}/>
                <Card.Text>
                  {userProfileData.volunteer_events.length} Events Volunteered For
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <h1 style={{ color: "#6840DF" }}>Events You're Hosting</h1>
          <Row>
            {userProfileData.user_events.length === 0 ? (
              <h3 style={{ fontStyle: "italic" }}>
                Doesn't look like you have any events you're collaborating on
                at this time
              </h3>
            ) : (
              userProfileData.user_events.map((event) => (
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
            {userProfileData.events_attending.length > 0 ? (
              userProfileData.events_attending.map((event) => (
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
      </Row>}
    </Container>
  );
}
}