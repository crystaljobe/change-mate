import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNounIcon } from "../utilities/DefaultIconsUtilities";
import { FcCalendar, FcClock } from "react-icons/fc";
import { IoPeopleCircle } from "react-icons/io5";
import { GiLaptop } from "react-icons/gi";
import { FaLink } from "react-icons/fa";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { MdLocationOn } from "react-icons/md";
import { ListGroup, Card, Button, CardBody } from "react-bootstrap";
import ICalButton from "./iCalButton";


function DetailedEventCard({
	description,
	title,
	startTime,
	startDate,
	endTime,
	endDate,
	time_zone,
	event_type,
	virtual_event_link,
	event_venue,
	event_venue_address,
	categoryName,
	num_users_attending,
	attendees_needed,
	volunteer_spots_remaining,
	volunteer_roles,
	hosts,
	lat,
	lon,
	event_photo,
	id,
}) {
	//styles for card
	const styles = {
		cardCSS: {
			maxWidth: "800px",
			margin: "24px",
		},
		header: {
			fontFamily: "Playfair Display, serif",
			fontOpticalSizing: "auto",
			fontStyle: "normal",
			fontWeight: "bold",
			color: "#6840DF",
			marginTop: "15px",
			marginBottom: "15px",
		},
		body: {
			fontFamily: "Poppins, sans-serif",
			fontWeight: "400",
			fontStyle: "normal",
		},
		subheader: {
			fontFamily: "Poppins, sans-serif",
			fontWeight: "400",
			fontStyle: "normal",
		},
		icon: {
			width: "80vw",
			maxWidth: "250px",
			margin: "0 auto",
			display: "block",
		},
		image: {
			width: "100%",
			maxHeight: "500px",
			// marginBottom: "20px",
		},
	};

	//use states
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
		if (!event_photo && !eventIcon) {
			// console.log("no event event_photo getting eventIcon")
			fetchEventIcon();
		}
		//creates hostsStr from collab arr in
		if (!hostStr) {
			let hostArr = hosts.map((host) => host.display_name);
			setHostStr(hostArr.join(", "));
		}
	}, []);

	//conditional for setting # of users
	function usersAttendingMessage() {
		if (num_users_attending === 0) {
			return `No attendees at this time.`;
		} else if (num_users_attending === 1) {
			return `You have ${num_users_attending} mate attending this event.`;
		} else {
			console.log("You have:", num_users_attending);
			return `${num_users_attending} mates are attending this event.`;
		}
	}

	//conditional for setting # of volunteers needed
	function volunteersNeededMessage() {
		if (volunteer_spots_remaining === 0) {
			return "WAHOOO! All volunteer spots filled!";
		} else if (volunteer_spots_remaining === 1) {
			return `${volunteer_spots_remaining} volunteer role is still waiting to be filled.`;
		} else {
			return `${volunteer_spots_remaining} volunteer roles still waiting to be filled.`;
		}
	}

	// Conditional Styling for image display based on src
	const imageStyle = event_photo ? styles.image : styles.icon;

	return (
		<Card style={styles.cardCSS} sm={8} border="light" className="mt-4">
			{/* Conditional rendering of event event_photo and styling; If event has event_photo, render that; If no event_photo, render default event icon */}
			<Card.Img
				className=""
				variant="top"
				src={event_photo || eventIcon}
				style={imageStyle}
				alt={`${title}'s event_photo`}
			/>
			<Card.Body>
				<Card.Title as="h1" style={styles.header} className="text-center">
					{title}
				</Card.Title>

				<Card.Subtitle as="h5" style={styles.subheader} className="text-center mt-2">
					<span style={{ fontStyle: "normal", fontWeight: "bold" }}>
						Hosted by:
					</span>{" "}
					{hostStr}
				</Card.Subtitle>

				<ListGroup variant="flush">
					<ListGroup.Item></ListGroup.Item>
					<ListGroup.Item
						className="text-center"
						style={{ paddingBottom: "10px" }}>
						{description}
					</ListGroup.Item>
					<br />
					<ListGroup.Item className="mb-2">
						<strong> Event Details: </strong>

						<ListGroup.Item className="mt-2">
							{/* conditional rendering for dates based on single or multiday event */}
							{startDate === endDate ? (
								<>
									<FcCalendar /> {startDate}
								</>
							) : (
								<>
									<FcCalendar /> {startDate} - {endDate}{" "}
								</>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<FcClock />
							{` ${startTime} - ${endTime}`} {time_zone}
						</ListGroup.Item>

						<ListGroup.Item>
							{event_venue ? (
								<>
									<IoPeopleCircle /> {event_type}
								</>
							) : (
								<>
									<GiLaptop /> {event_type}
								</>
							)}
						</ListGroup.Item>
						{virtual_event_link ? (
							<ListGroup.Item>
								<FaLink />{" "}
								<a href={virtual_event_link} style={{ fontSize: "14px" }}>
									{" "}
									{virtual_event_link}{" "}
								</a>
							</ListGroup.Item>
						) : (
							<>
								<ListGroup.Item>
									<PiBuildingOfficeFill /> {event_venue}
								</ListGroup.Item>
								<ListGroup.Item>
									<MdLocationOn />
									<Link
										to={`https://www.google.com/maps?q=${lat},${lon}`}
										target="_blank"
										rel="noopener noreferrer">
										{" "}
										{event_venue_address}
									</Link>
								</ListGroup.Item>
							</>
						)}
					</ListGroup.Item>

					<ListGroup.Item className="mb-2">
						
						<strong> Event Activity: </strong>
						<ul>
							<li>
								{attendees_needed ? (
									<Card.Text>{usersAttendingMessage()}</Card.Text>
								) : null}
							</li>

							<li>
								{volunteer_roles.length === 0 ? (
									null
								) : (<Card.Text>{volunteersNeededMessage()}</Card.Text>)}
							</li>
						</ul>
					</ListGroup.Item>
				</ListGroup>
				</Card.Body>
				<Card.Footer className="text-center" >
					Add to Calendar: 
					<br/>
					<ICalButton eventID={id}/>
				</Card.Footer>
			
		</Card>
	);
}
export default DetailedEventCard;
