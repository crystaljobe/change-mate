import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image, Carousel } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react'; // Import the FullCalendar component
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin to display the calendar in a day grid view
import { getNounIcon } from '../utilities/DefaultIconsUtilities';
import UserProfileInfoCard from "../components/UserProfileInfoCard";


// Define the UserProfile component which accepts a user prop
export default function UserProfile({ user }) {
  // Use the OutletContext to get userProfileData and its setter function
  const { userProfileData, setUserProfileData } = useOutletContext();
  // State variables to hold various user and events related data
  const [profileIcon, setProfileIcon] = useState("");
  const [eventIcon, setEventIcon] = useState("");
  const [badges, setBadges] = useState({})
  const [calendarEvents, setCalendarEvents] = useState([]); // State to show events on calendar
  const [isCalendarVisible, setIsCalendarVisible] = useState(true); // State to toggle calendar visibility


  useEffect(() => {
    const fetchData = async () => {
      // Fetch icon data only if it's not already fetched
      try {
        if (!profileIcon) {
          const iconData = await getNounIcon(4091300);
          setProfileIcon(iconData);
        }
        if (!eventIcon) {
          const eventIconData = await getNounIcon(5130800);
          setEventIcon(eventIconData);
        }
        // Fetch other icons if needed, similar to the above
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData(); // Call the function to fetch icons
  }, [profileIcon, eventIcon]); // Include relevant dependencies

  useEffect(() => {
    if (userProfileData.events_attending) {
      const fetchEvents = async () => {
        // Fetch events data if userProfileData.events_attending is available
        try {
          // Fetch events data and update state
          // You can add your logic here
        } catch (error) {
          console.error('Failed to fetch events:', error);
        }
      };

      fetchEvents(); // Call the function to fetch events
    }
  }, [userProfileData.events_attending]);

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  // Main component layout using Bootstrap's grid system
  return (
    <Container fluid>
      {userProfileData.id && <>
        <Row>
          <Col xs={12}>
            <UserProfileInfoCard
              {...userProfileData}  // This spreads existing props, continue to use if applicable
              profileIcon={profileIcon}
              badges={badges}
              interests={userProfileData.interests}
              userEvents={userProfileData.user_events}
              eventsAttending={userProfileData.events_attending}
              volunteerEvents={userProfileData.volunteer_events}
            />
          </Col>
        </Row>

        {/* Everything below profile bar */}

        <Row>
          {/* Events Column */}
          <Col md={{ span: 3, offset: 4 }}> {/* Adjusted for centering events */}
            <h1 style={{ color: "#6840DF", textAlign: 'center' }}>Events You're Hosting</h1>
            <Carousel nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />} prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}>
              {userProfileData.user_events.length === 0 ? (
                <Carousel.Item>
                  <h3 style={{ fontStyle: "italic" }}>
                    Doesn't look like you have any events you're collaborating on at this time
                  </h3>
                </Carousel.Item>
              ) : (
                // Group every two events into a single Carousel item
                userProfileData.user_events.reduce((result, value, index, array) => {
                  if (index % 2 === 0)
                    result.push(array.slice(index, index + 2));
                  return result;
                }, []).map((eventGroup, idx) => (
                  <Carousel.Item key={idx}>
                    <div className="d-flex justify-content-around">
                      {eventGroup.map(event => (
                        <Card key={event.id} style={{ width: "30rem", height: "40rem", flex: "0 0 48%" }}> {/* Adjusted width */}
                          <Card.Body>
                            <Card.Title>{event.title}</Card.Title>
                            <Card.Img
                              variant="top"
                              src={event.event_photo || eventIcon}
                              style={{ height: "425px", width: "100%" }}
                            />
                            <Card.Text>
                              <strong>When:</strong> {`${event.startDate} at ${event.startTime} -- ${event.endDate} at ${event.endTime}`}
                              <br />
                              <strong>Event Type:</strong> {event.event_type}
                              {event.event_type !== "Virtual" && (
                                <>
                                  <br />
                                  <strong>Location:</strong> {event.event_venue}
                                </>
                              )}
                            </Card.Text>
                            <Button variant="info" as={Link} to={`/editevent/${event.id}`}>Edit Event Details</Button>
                            <Button variant="info" as={Link} to={`/event/${event.id}`}>View Event Details</Button>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  </Carousel.Item>
                ))
              )}
            </Carousel>
            <h1 style={{ color: "#6840DF", textAlign: 'center' }}>Events You're Attending</h1>
            <Carousel nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />} prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}>
              {userProfileData.events_attending.length === 0 ? (
                <Carousel.Item>
                  <h3 style={{ fontStyle: "italic" }}>
                    Doesn't look like you've RSVP'd to any events yet.
                  </h3>
                </Carousel.Item>
              ) : (
                userProfileData.events_attending.reduce((result, value, index, array) => {
                  if (index % 2 === 0)
                    result.push(array.slice(index, index + 2));
                  return result;
                }, []).map((eventGroup, idx) => (
                  <Carousel.Item key={idx}>
                    <div className="d-flex justify-content-around">
                      {eventGroup.map(event => (
                        <Card key={event.id} style={{ width: "30rem", height: "40rem", flex: "0 0 48%" }}> {/* Adjusted width for two cards */}
                          <Card.Body>
                            <Card.Title>{event.title}</Card.Title>
                            <Card.Img
                              variant="top"
                              src={event.event_photo || eventIcon}
                              style={{ height: "425px", width: "100%" }}  // Adjust height if necessary
                            />
                            <Card.Text>
                              <strong>When:</strong> {`${event.startDate} at ${event.startTime} -- ${event.endDate} at ${event.endTime}`}
                              <br />
                              <strong>Event Type:</strong> {event.event_type}
                              {event.event_type !== "Virtual" && (
                                <>
                                  <br />
                                  <strong>Location:</strong> {event.event_venue}
                                </>
                              )}
                            </Card.Text>
                            <Button variant="info" as={Link} to={`/event/${event.id}`}>View Event Details</Button>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  </Carousel.Item>
                ))
              )}
            </Carousel>
            
          </Col>
          {/* Calendar Column */}
          <Col md={5} className="text-end">
            {/* Toggle button and calendar */}
            <Button onClick={toggleCalendarVisibility} style={{ marginBottom: '10px', textAlign: 'right' }}>
              {isCalendarVisible ? 'Hide Calendar' : 'Show Calendar'}
            </Button>
            {isCalendarVisible && (
              <div className="calendar-container" style={{ maxWidth: "600px", margin: "auto" }}>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  events={calendarEvents}
                />
              </div>
            )}
          </Col>
        </Row>
      </>}
    </Container >
  );
}