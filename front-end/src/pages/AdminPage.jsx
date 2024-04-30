import { useParams, Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../utilities/UserProfileUtilities";
import {
  getProfileIcon,
  getEventIcon,
} from "../utilities/DefaultIconsUtilities";
import { Container, Row, Col, Card, Button, CardGroup } from "react-bootstrap";


/*currently using .user_events to test formatting
    NEED TO CHANGE TO .hosted_events */

//only hosts have permission to access this page (profile.hosted_events(eventID == eventID))
//FEATURES:
// - add other hosts
// - accept volunteer applications
// - create todo lists tasks
// - assign volunteers to tasks

//> (/events/{event_id}/volunteers/)
//GET - see all vol roles for event
//POST - create a new vol role for event
// > (/events/{event_id}/volunteers/{role_id})
//GET - view vol role by id
//PUT - edit volrole {'role', 'assigned_volunteers' <userProf IDs>, 'num_volunteers_needed'}
//DELETE - delete
function AdminPage() {
  // URI== /event/:eventID/admin
  const [userHostEvents, setUserHostEvents] = useState([]);
  const [eventIcon, setEventIcon] = useState("")
  let { eventID } = useParams();


  // Use the OutletContext to get userProfileData and its setter function
  const { userProfileData, setUserProfileData } = useOutletContext(); //userProfData = {id, hosted_events}

  //console.log('ADMIN PAGE--user profileData', userProfileData.display_name)

  // Fetches default event icon
  const fetchEventIcon = async () => {
    const icon = await getEventIcon();
    setEventIcon(icon);
  };
   useEffect(() => {
     fetchEventIcon();
   }, []);


  //set array of events that are being hosted by this user
  useEffect(() => {
    // setUserHostEvents(userProfileData.hosted_events)
    setUserHostEvents(userProfileData.user_events);
  }, [userProfileData]);

 ;
  //if userProfileData.hosted_events.length === 0 --> display "You are not hosting any events!"
  console.log("ADMIN PAGE--user user_events", userHostEvents && userHostEvents);

  return (
   <>
   
   </>
  );
}

export default AdminPage;
//  <Container fluid >
//       <Row style={{ overflowX: "scroll", height: '40vh', overflowY: 'hidden'}}>
//         {userHostEvents && userHostEvents.length === 0 ? (
//           <h3 style={{ fontStyle: "italic" }}>
//             You are not hosting any events at this time
//           </h3>
//         ) : (
//           userHostEvents &&
//           userHostEvents.map((event) => (
//               <Card key={event.id}  style={{ width: "30vw" }}>
//                 <Card.Body>
//                   <Card.Title>{event.title}</Card.Title>

//                   {/* Conditional rendering of event photo; If event has photo, render that; If no photo, render default event icon */}

//                   <Card.Img
//                     variant="top"
//                     src={(event.event_photo && event.event_photo) || eventIcon}
//                     style={{ height: "200px", width: "200px" }}
//                     alt={`${event.title}'s photo`}
//                   />

//                   <Card.Text>
//                     <strong> When: </strong>{" "}
//                     {` ${event.startDate} at ${event.startTime} -- ${event.endDate} at ${event.endTime}`}
//                     <br />
//                     <strong>Event Type: </strong> {event.event_type}
//                     <br />
//                     {event.event_type === "Virtual" ? null : (
//                       <>
//                         <strong>Location: </strong>
//                         {event.event_venue}
//                       </>
//                     )}
//                   </Card.Text>
//                   {/* 
//                     <Button
//                       style={{ margin: 3 }}
//                       variant="info"
//                       as={Link}
//                       to={`/editevent/${event.id}`}
//                     >
//                       Edit Event Details
//                     </Button> */}
//                 </Card.Body>
//               </Card>
//           ))
//         )}
//       </Row>
//     </Container>