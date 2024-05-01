import { useParams, Link, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getAdminEventDetails,
} from "../utilities/EventUtilities";
import DetailedEventCard from "../components/DetailedEventCard";
import VolunteerManager from "../components/VolunteerManager";
import TodoList from "../components/ToDoList";
import HostsManager from "../components/HostsManager";

//styling imports
import { Container, Row, Col, } from "react-bootstrap";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
} from "@mui/material";



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
  const [eventDetails, setEventDetails] = useState({});
  const [roles, setRoles] = useState([]);
  const [approvedVolunteers, setApprovedVolunteers] = useState([]);
  const [volunteerApplications, setVolunteerApplications] = useState([]);

  const [hosts, setHosts] = useState([]); //array of userProfile instances that are 'collaborators' {display_name, profile_picture, user_id}
  const { userProfileData } = useOutletContext(); //obj that contains {id, display_name, image, user_events[{arr of event Objs that user is a collaborator/host of}]}
  let { eventID } = useParams();
  const showAddToDo = true;

  //get event details - set Hosts, Approved Vols., Vol. applications
  const getEvent = async () => {
    const eventDetails = await getAdminEventDetails(eventID);
    setEventDetails(eventDetails);
    const hostArr = eventDetails.hosts;
    const approvedVols = eventDetails.volunteers;
    const volApplications = eventDetails.applicants; //arr of obj {id <role.id>, role, [applicants] < arr of objs {application_id, user_id, applicant_id, display_name, profile_picture}> }
    let rolesArr = []
    volApplications.map((roleInstance) => {
      rolesArr.push(roleInstance.role)
    })

    setApprovedVolunteers(approvedVols); //an arr of obj {id<applicant id>, role, user_id, display_name, profile_picture}
    setVolunteerApplications(volApplications);
    setHosts(hostArr);
    setRoles(rolesArr)
  };

  useEffect(() => {
    getEvent();
  }, []);

  
 
  // console.log(`admin page-- hosts: ${hosts}  ApprovedVols: ${approvedVolunteers}   volAPPs ${volunteerApplications}`)
  console.log(`admin page -- hosts`, hosts)
  console.log(`admin- eventDetails`, eventDetails)
  console.log(`admin- roles`, roles);




  return (
    <Container fluid className="event-collab-container">
      <Row className="gx-5">
        <Col md={4} className="event-details-col">
          <DetailedEventCard eventDetails={eventDetails} />
          <Button
            size="large"
            style={{ margin: "5%" }}
            className="button-gradient text-center"
            variant="info"
            as={Link}
            to={`/editevent/${eventDetails.id}`}
          >
            Edit Event Details
          </Button>
        </Col>
        <Col md={4} className="discussion-forum-col">
          <Row>
            <VolunteerManager
              approvedVolunteers={approvedVolunteers}
              volunteerApplications={volunteerApplications}
              eventID={eventID}
              roles={roles}
              setRoles={setRoles}
            />
          </Row>
        </Col>
        <Col md={4} className="todo-participant-col">
          <TodoList showAddToDo={showAddToDo} />
          <Row>
            <HostsManager />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;