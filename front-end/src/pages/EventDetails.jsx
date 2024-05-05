import {
	Container,
	Col,
	Row,
} from "react-bootstrap";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import "add-to-calendar-button";
import { getEventDetails, setUserAttending } from "../utilities/EventUtilities";
import DetailedEventCard from "../components/DetailedEventCard";
import VolunteerApplication from "../components/VolunteerApplication";
import StaticMap from "../components/EventDetailsStaticMap";

export default function EventDetails() {
	let { eventID } = useParams();
	const { userProfileData } = useOutletContext();

	const [eventDetails, setEventDetails] = useState({});

	//consolidated useEffects on page and only recall api if event id changes
	useEffect(() => {
		//only fetch data once
		if (!eventDetails.hosts) {
			async function fetchAllData() {
				try {
					//get and set event details and iCal details
					const event = await getEventDetails(eventID);
					setEventDetails(event);
					// console.log("fetching and setting")
				} catch (error) {
					console.error(error);
				}
			}
			fetchAllData();
		}
	}, [eventID]);

	// onClick function for RSVP button to handle put request to add user as attending
	const handleRSVP = async () => {
		const rsvp = await setUserAttending(eventID);
		if (rsvp) {
			console.log("user rsvp");
		}
	};

	//conditional for setting # of users 
	function usersAttendingMessage() {
		if (num_users_attending === 0) {
			return;
		} else if (num_users_attending === 1){
			return `${num_users_attending} of your mates is attending this event, would you like to join them at this event?`
		} else {
			return `${num_users_attending} of your mates are attending this event, would you like to join them at this event?`
		}
	}

	//conditional for setting # of volunteers needed 
	function volunteersNeededMessage(){
		if (volunteer_spots_remaining === 0) {
			return "All volunteer spots filled!"
		} else if (volunteer_spots_remaining === 1) {
			return `This event is needing ${volunteer_spots_remaining} more volunteer. Would you like to volunteer for this event?`
		}
	}
 //still working on this piece 
 
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
		return attending ? (
			<a>Attending</a>
		) : (
			<a onClick={handleRSVP}>Attend This Event</a>
		);
	};

	// application modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Container>
			<Row>
				<Col md={8} sm={12}>
					{console.log(eventDetails)}

					{eventDetails.hosts && (
						<DetailedEventCard {...eventDetails} />)
					}
          <Link
								to={`/eventCollab/${eventID}`}
								className="btn btn-primary mr-2">
								Let's Collaborate!
							</Link>
							<Link to="/eventadmin" className="btn btn-primary">
								Admin Time!
							</Link>

					<div className="dropdown-container">
						<button className="dropdown-button">Count me in!</button>
						<div className="dropdown-content">
							{/* TODO: add conditonal rendering for volunteer option if event is accepting volunteers */}
							{/* added volunteer application modal as a component */}
							<a onClick={handleShow}>Volunteer</a>

                <VolunteerApplication
                  show={show}
                  handleClose={handleClose}
                  eventID={eventID}
                />
						{/* if event needs attendees */}
						{eventDetails.attendees_needed ? renderAttendingButton() : null}
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

				</Col>
			</Row>
		</Container>
	);
}
