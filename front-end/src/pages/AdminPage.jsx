import { useParams, Link, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getAdminEventDetails,
  volunteerRoles,
  createVolunteerRole,
  deleteVolunteerRole,
} from "../utilities/EventUtilities";
import DetailedEventCard from "../components/DetailedEventCard";
import VolunteerManager from "../components/VolunteerManager";
import TodoList from "../components/ToDoList";
import {
  getProfileIcon,
  getEventIcon,
} from "../utilities/DefaultIconsUtilities";
//styling imports
import { Container, Row, Col, } from "react-bootstrap";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  TextField,
  Button,
  Box,
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
  const [hostSearchInput, setHostSearchInput] = useState("");
  const [roles, setRoles] = useState([]);
  const [approvedVolunteers, setApprovedVolunteers] = useState([]);
  const [volunteerApplications, setVolunteerApplications] = useState([]);

  const [newHost, setNewHost] = useState({});
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
    const volApplications = eventDetails.applicants;
    setApprovedVolunteers(approvedVols);
    setVolunteerApplications(volApplications);
    setHosts(hostArr);
  };

  useEffect(() => {
    getEvent();
    searchNewHost();
    getVolunteerRoles();
  }, []);

  //setting roles array by making api call for specific event
  const getVolunteerRoles = async () => {
    let rolesArr = await volunteerRoles(eventID); //{id, assigned_volunteers, role, num_volunteers_needed, event}
    setRoles(rolesArr);
  };


  //TODO: need to search for users by email
  const searchNewHost = async () => {
    // const newHostData = await getProfileInfo({ 'user': "rs@cp.com" });
    newHostData ? setNewHost(newHostData) : setNewHost(null);
    console.log("admin page -- newHostData:", newHostData);
  };

  return (
    <Container fluid className="event-collab-container">
      <Row className="gx-5">
        <Col md={4} className="event-details-col">
          <DetailedEventCard eventDetails={eventDetails} />
          <Button
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
          <Row><VolunteerManager />
          </Row>

          <Row>
            <Card sx={{ width: "50%" }}>
              <CardHeader title="Add Hosts" />
              <Box
                sx={{ display: "flex", alignItems: "flex-end" }}
                component="form"
                noValidate
                autoComplete="off"
              >
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  id="input-with-sx"
                  label="enter a user's email"
                  variant="standard"
                  value={hostSearchInput}
                  onChange={(e) => setHostSearchInput(e.target.value)}
                />
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Box>
            </Card>
          </Row>
        </Col>
        <Col md={4} className="todo-participant-col">
          <TodoList showAddToDo={showAddToDo} />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;