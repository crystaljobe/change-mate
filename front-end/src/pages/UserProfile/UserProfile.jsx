import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react'; // Import the FullCalendar component
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin to display the calendar in a day grid view
import UserProfileInfoCard from "../../components/UserProfileInfoCard";
import EventCard from "../../components/EventCard";
import './UserProfile.css'


// Define the UserProfile component which accepts a user prop
export default function UserProfile() {
  // Use the OutletContext to get userProfileData and its setter function
  const { userProfileData, setUserProfileData } = useOutletContext();
  // State variables to hold various user and events related data
  const [badges, setBadges] = useState({})
  const [isCalendarVisible, setIsCalendarVisible] = useState(true); // State to toggle calendar visibility
  const [cardsPerPage, setCardsPerPage] = useState(4);

  useEffect(() => {
      const updateCardsPerPage = () => {
          const screenWidth = window.innerWidth;
          if (screenWidth >= 3000) {
              setCardsPerPage(8);
          } else if (screenWidth >= 2700) {
              setCardsPerPage(7);
          } else if (screenWidth >= 2300) {
              setCardsPerPage(6);
          } else if (screenWidth >= 2000) {
              setCardsPerPage(5);
          } else if (screenWidth >= 1700) {
              setCardsPerPage(4);
          } else if (screenWidth >= 1400) {
              setCardsPerPage(3);
          }else if (screenWidth >= 992) {
              setCardsPerPage(3);
          } else if (screenWidth >= 768) {
              setCardsPerPage(2);
          } else {
              setCardsPerPage(1);
          }
      };

      updateCardsPerPage();
      window.addEventListener('resize', updateCardsPerPage);
      return () => {
          window.removeEventListener('resize', updateCardsPerPage);
      };
  }, []);

  // Chunks results of popular events, volunteer events and additional events into groups of three for rendering
  function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  // const popularGroupedEvents = chunkArray(eventsPopular, 3);
  // const volunteerGroupedEvents = chunkArray(eventsVolNeed, cardsPerPage);
  const eventsAttending = () => {
    if (userProfileData.events_attending.length === 0) {
      return [];
    }
    return chunkArray(eventsAdditional, cardsPerPage)
  };


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
              badges={badges}
              interests={userProfileData.interests}
              userEvents={userProfileData.user_events}
              eventsAttending={userProfileData.events_attending}
              volunteerEvents={userProfileData.volunteer_events}
            />
            {console.log(userProfileData)}
          </Col>
        </Row>

        {/* Everything below profile bar */}

        <Row>
          {/* Events Column for Hosted Events */}
          <Col md={{ span: 4, offset: 3 }}> {/* Adjusted for centering events */}
            <h1 style={{ color: "#6840DF", textAlign: 'center' }}>Hosted Events</h1>
            <Carousel interval={null} indicators={false} prevLabel="" nextLabel="" className="px-5">
              {userProfileData.user_events.length === 0 ? (
                  <h3 className="text-center" style={{ fontStyle: "italic" }}>
                    Doesn't look like you have any events you're collaborating on at this time
                  </h3>
              ) : (
                userProfileData.user_events.reduce((result, value, index, array) => {
                  if (index % 2 === 0)
                    result.push(array.slice(index, index + 2));
                  return result;
                }, []).map((eventGroup, idx) => (
                  <Carousel.Item key={idx}>
                    <div className="d-flex flex-row align-items-stretch justify-content-around" style={{ width: '100%' }}>
                      {eventGroup.map(event => (
                        <EventCard key={event.id} eventCategory="userEvents" {...event} />
                      ))}
                    </div>
                  </Carousel.Item>
                ))
              )}
            </Carousel>

            <h1 style={{ color: "#6840DF", textAlign: 'center' }}>Volunteering Events</h1>
            <Carousel interval={null} indicators={false} prevLabel="" nextLabel="" className="px-5">
              {userProfileData.volunteer_events.length === 0 ? (
                <Carousel.Item>
                  <h3 className="text-center" style={{ fontStyle: "italic" }}>
                    Doesn't look like you're volunteering at any events yet.
                  </h3>
                </Carousel.Item>
              ) : (
                userProfileData.volunteer_events.reduce((result, value, index, array) => {
                  if (index % 2 === 0)
                    result.push(array.slice(index, index + 2));
                  return result;
                }, []).map((eventGroup, idx) => (
                  <Carousel.Item key={idx}>
                    <div className="d-flex justify-content-around">
                      {eventGroup.map(application => {
                        const event = application.event;
                        return (
                          <EventCard key={application.id} eventCategory="volunteerEvents" {...event} applicationStatus={application.application_status} />
                        );
                      })}
                    </div>
                  </Carousel.Item>
                ))
              )}
            </Carousel>

            <h1 style={{ color: "#6840DF", textAlign: 'center' }}>Attending Events</h1>
            <Carousel interval={null} indicators={false} prevLabel="" nextLabel="" className="px-5">
              {userProfileData.events_attending.length === 0 ? (
                  <h3 className="text-center" style={{ fontStyle: "italic" }}>
                    Doesn't look like you've RSVP'd to any events yet.
                  </h3>
              ) : (
                userProfileData.events_attending.reduce((result, value, index, array) => {
                  if (index % 2 === 0)
                    result.push(array.slice(index, index + 2));
                  return result;
                }, []).map((eventGroup, idx) => (
                  <Carousel.Item key={idx}>
                    <div className="d-flex justify-content-around">
                      {eventGroup.map(event => (
                        <EventCard key={event.id} eventCategory="eventsAttending" {...event} />
                      ))}
                    </div>
                  </Carousel.Item>
                ))
              )}
            </Carousel>

            {userProfileData.events_attending.length === 0 ? (
                  <h3 className="text-muted text-center">Doesn't look like you've RSVP'd to any events yet.</h3>
              ) : (
                  <Carousel interval={null} indicators={false} prevLabel="" nextLabel="" className="px-5">
                      {eventsAttending.map((chunk, index) => (
                          <Carousel.Item key={index}>
                              <div className="d-flex flex-nowrap overflow-hidden">
                                  {chunk.map((event, idx) => (
                                      <div key={idx} className="ms-4">
                                          <EventCard {...event} eventCategory={null} />
                                      </div>
                                  ))}
                              </div>
                          </Carousel.Item>
                      ))}
                  </Carousel>
              )}
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
                  events={userProfileData.user_events.map(event => ({
                    title: event.title,
                    start: event.event_start,
                    end: event.event_end
                  }))}
                />
              </div>
            )}
          </Col>
        </Row>
      </>}
    </Container >
  );
}