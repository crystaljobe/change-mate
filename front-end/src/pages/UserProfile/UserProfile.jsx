import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react"; // Import the FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Plugin to display the calendar in a day grid view
import UserProfileInfoCard from "../../components/UserProfileInfoCard";
import EventCard from "../../components/EventCard";
import "./UserProfile.css";
import { Modal } from "react-bootstrap";

// Define the UserProfile component which accepts a user prop
export default function UserProfile() {
  // Use the OutletContext to get userProfileData and its setter function
  const { userProfileData, setUserProfileData } = useOutletContext();
  // State variables to hold various user and events related data
  const [badges, setBadges] = useState({});
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // State to toggle calendar visibility
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
      } else if (screenWidth >= 992) {
        setCardsPerPage(3);
      } else if (screenWidth >= 768) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(1);
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => {
      window.removeEventListener("resize", updateCardsPerPage);
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


  const hostEvents = () => {
    if (userProfileData.user_events.length === 0) {
      return [];
    }
    return chunkArray(userProfileData.user_events, cardsPerPage);
  };

  const volunteerEvents = () => {
    if (userProfileData.volunteer_events.length === 0) {
      return [];
    }
    return chunkArray(userProfileData.volunteer_events, cardsPerPage);
  };
  const eventsAttending = () => {
    if (userProfileData.events_attending.length === 0) {
      return [];
    }
    return chunkArray(userProfileData.events_attending, cardsPerPage);
  };

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  // Main component layout using Bootstrap's grid system
  return (
    <Container fluid>
      {userProfileData.id && (
        <>
          <Row>
            <Col xs={12}>
              <UserProfileInfoCard
                {...userProfileData} // This spreads existing props, continue to use if applicable
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

          <Row className="justify-content-center">
            {/* Toggle button and calendar */}
            <Col xs={12} sm={6} md={4} lg={3} xl={2}>
              {" "}
              {/* Adjust column width based on screen size */}
              <Button
                onClick={toggleCalendarVisibility}
                style={{
                  marginBottom: "10px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {" "}
                {/* Set width to 100% */}
                {isCalendarVisible ? "Hide Calendar" : "Show Calendar"}
              </Button>
            </Col>
            {isCalendarVisible && (
              <Modal
                show={isCalendarVisible}
                onHide={toggleCalendarVisibility}
                size="xl"
              >
                {" "}
                {/* Use show prop to toggle modal visibility */}
                <Modal.Header closeButton>
                  <Modal.Title>Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div
                    className="calendar-container"
                    style={{ maxWidth: "800px", margin: "auto" }}
                  >
                    <FullCalendar
                      plugins={[dayGridPlugin]}
                      initialView="dayGridMonth"
                      events={userProfileData.user_events.map((event) => ({
                        title: event.title,
                        start: event.event_start,
                        end: event.event_end,
                      }))}
                    />
                  </div>
                </Modal.Body>
              </Modal>
            )}
          </Row>

          <Row className="justify-content-center">
            {/* Events Column for Hosted Events */}
            <Col xs={12}>
              {/* Adjusted for centering events */}
              <h1 style={{ color: "#6840DF", textAlign: "center", marginTop: "4vh", marginBottom: "3vh"   }}>
                Hosted Events
              </h1>
              {userProfileData.events_attending.length === 0 ? (
                <h3 className="text-muted text-center">
                Doesn't look like you have any events you're collaborating
                    on at this time.
                </h3>
              ) : (
                <Carousel
                  interval={null}
                  indicators={false}
                  prevLabel=""
                  nextLabel=""
                  className="px-5"
                >
                  {hostEvents().map((chunk, index) => (
                    <Carousel.Item key={index}>
                      <div className="d-flex justify-content-around">
                        {chunk.map((event) => (
                            <EventCard
                              key={event.id}
                              {...event}
                              eventCategory={"userEvents"}
                            />
                        ))}
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}

          
              <h1 style={{ color: "#6840DF", textAlign: "center", marginTop: "4vh", marginBottom: "3vh" }}>
                Volunteer Events
              </h1>
              {userProfileData.volunteer_events.length === 0 ? (
                <h3 className="text-muted text-center">
                  Doesn't look like you've Volunteered for any events yet.
                </h3>
              ) : (
                <Carousel
                  interval={null}
                  indicators={false}
                  prevLabel=""
                  nextLabel=""
                  className="px-5"
                >
                  {volunteerEvents().map((chunk, index) => (
                    <Carousel.Item key={index}>
                      <div className="d-flex justify-content-around">
                        {chunk.map((application) => {
                          const event = application.event;
                          return (
                            <EventCard
                              key={application.id}
                              eventCategory="volunteerEvents"
                              {...event}
                              applicationStatus={application.application_status}
                            />
                          );
                        })}
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}

              <h1 style={{ color: "#6840DF", textAlign: "center", marginTop: "4vh", marginBottom: "3vh"  }}>
                Attending Events
              </h1>
              {userProfileData.events_attending.length === 0 ? (
                <h3 className="text-muted text-center">
                  Doesn't look like you've RSVP'd to any events yet.
                </h3>
              ) : (
                <Carousel
                  interval={null}
                  indicators={false}
                  prevLabel=""
                  nextLabel=""
                  className="px-5"
                >
                  {eventsAttending().map((chunk, index) => (
                    <Carousel.Item key={index}>
                      <div className="d-flex justify-content-around">
                        {chunk.map((event) => (
                            <EventCard
                              key={event.id}
                              {...event}
                              eventCategory={"eventsAttending"}
                            />
                        ))}
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
