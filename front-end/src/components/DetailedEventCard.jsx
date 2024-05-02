import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNounIcon } from "../utilities/DefaultIconsUtilities";
import { FcCalendar, FcClock } from "react-icons/fc";

import {
	Container,
	Col,
	Row,
	ListGroup,
	Card,
	Button,
	ListGroupItem,
} from "react-bootstrap";

function DetailedEventCard({ eventDetails
//   description,
//   title,
//   startTime, 
//   startDate,
//   endTime,
//   endDate,
//   time_zone,
//   event_type,
//   virtual_event_link,
//   event_venue,
//   event_venue_address,
//   categoryName,
//   num_users_attending,
//   volunteer_spots_remaining,
//   hosts,
//   lat, 
//   lon,
//   event_photo,
 }) {

  //styles for card
	const styles = {
		cardCSS: {
			// width: "80vw",
			maxWidth: "800px",
			margin: "24px",
		},
		header: {
			fontFamily: "Playfair Display, serif",
			fontOpticalSizing: "auto",
			fontStyle: "normal",
			fontWeight: "bold",
			color: "#6840DF",
			// textDecoration: "underline",
			marginTop: "15px",
			marginBottom: "15px",
		},
		body: {
			fontFamily: "Slabo 27px, serif",
			fontWeight: "400",
			fontStyle: "normal",
		},
		subheader: {
			fontFamily: "Slabo 27px, serif",
			fontWeight: "400",
			fontStyle: "italic",
		},
		icon: {
			width: "80vw",
			maxWidth: "250px",
			margin: "0 auto",
			display: "block",
		},
		image: {
			width: "100%",
			maxHeight: "575px",
			// marginBottom: "20px",

		},
	};

	const [eventIcon, setEventIcon] = useState("");
	const [hostStr, setHostStr] = useState(null);

	// Fetch default event icon
	const fetchEventIcon = async () => {
		const icon = await getNounIcon(5130800);
		setEventIcon(icon);
	};

	// updated to add conditional to only fetch icon if it's needed
  // reduced use effects to one, since collaborators will never be undefined - automatically call setUpCardInfo
	useEffect(() => {
		if (!eventDetails.event_photo && !eventIcon) {
			// console.log("no event event_photo getting eventIcon")
			fetchEventIcon();
		}
    	//creates hostsStr from collab arr in 	
		if (!hostStr) {
      let hostArr = eventDetails.hosts.map((host) => host.display_name);
      setHostStr(hostArr.join(", "));
    }
	}, []);

  // Conditional Styling for image display based on src
	const imageStyle = eventDetails.event_photo ? styles.image : styles.icon;

	return (
    <Card style={styles.cardCSS} sm={8} border="light" className="mt-4">
      {/* Conditional rendering of event event_photo and styling; If event has event_photo, render that; If no event_photo, render default event icon */}
      <Card.Img
        className=""
        variant="top"
        src={eventDetails.event_photo || eventIcon}
        style={imageStyle}
        alt={`${eventDetails.title}'s event_photo`}
      />
      <Card.Body>
        <Card.Title as="h1" style={styles.header} className="text-center">
          {eventDetails.title}
        </Card.Title>

        <Card.Subtitle
          as="h5"
          style={styles.subheader}
          className="text-center mt-2"
        >
          <span style={{ fontStyle: "normal", fontWeight: "bold" }}>
            Hosted by:
          </span>{" "}
          {hostStr}
        </Card.Subtitle>

        <ListGroup variant="flush">
          <ListGroup.Item></ListGroup.Item>
          <ListGroup.Item
            className="text-center"
            style={{ paddingBottom: "10px" }}
          >
            {eventDetails.description}
          </ListGroup.Item>
          <br />
          <ListGroup.Item className="mb-2">
            <strong> Event Details: </strong>

            <ListGroup.Item className="mt-2">
              {/* conditional rendering for dates based on single or multiday event */}
              {eventDetails.startDate === eventDetails.endDate ? (
                <>
                  <FcCalendar /> {eventDetails.startDate}
                </>
              ) : (
                <>
                  <FcCalendar /> {eventDetails.startDate} -{" "}
                  {eventDetails.endDate}{" "}
                </>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <FcClock />
              {` ${eventDetails.startTime} - ${eventDetails.endTime}`}
            </ListGroup.Item>

            <ListGroup.Item>
              {" "}
              <strong> Time Zone: </strong> {eventDetails.time_zone}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong> Event Type: </strong>
              {eventDetails.event_type}
            </ListGroup.Item>
            {eventDetails.event_type === "Virtual" ? (
              <ListGroup.Item>
                <strong> Event ListGroup.Item: </strong>
                <a
                  href={eventDetails.virtual_event_link}
                  style={{ fontSize: "14px" }}
                >
                  {" "}
                  {eventDetails.virtual_event_link}{" "}
                </a>
              </ListGroup.Item>
            ) : (
              <>
                <ListGroup.Item>
                  <strong> Event Venue: </strong>
                  {eventDetails.event_venue}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Venue Address: </strong>
                  <Link
                    to={`https://www.google.com/maps?q=${eventDetails.lat},${eventDetails.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {eventDetails.event_venue_address}
                  </Link>
                </ListGroup.Item>
              </>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default DetailedEventCard;
