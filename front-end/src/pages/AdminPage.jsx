import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdminEventDetails } from "../utilities/EventUtilities";
import DetailedEventCard from "../components/DetailedEventCard";
import VolunteerManager from "../components/VolunteerManager";
import TodoList from "../components/ToDoList";
import HostsManager from "../components/HostsManager";

//styling imports
import { Container, Row, Col, } from "react-bootstrap";
import { Button, Drawer, Box, IconButton, Fab } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';



export default function AdminPage() {
  const [eventDetails, setEventDetails] = useState({});
  const [roles, setRoles] = useState([]);
  const [approvedVolunteers, setApprovedVolunteers] = useState([]);
  const [volunteerApplications, setVolunteerApplications] = useState([]);
  const [showMenu, setShowMenu] = useState(true);
  const [open, setOpen] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const [userValidated, setUserValidated] = useState(false);
  const [hosts, setHosts] = useState([]); //array of userProfile instances that are 'collaborators' {display_name, profile_picture, user_id}
  const { userProfileData } = useOutletContext(); //obj that contains {id, display_name, image, user_events[{arr of event Objs that user is a collaborator/host of}]}
  let { eventID } = useParams();
  const navigate = useNavigate()
  const showAddToDo = true;

  console.log('eventDetails', eventDetails)

  // Decides if user is allowed or not
  const isUserAllowed = (userID) => {
    if (Array.isArray(hosts) && hosts.length > 0 && typeof userID !== 'undefined') {

      // Searches hosts to see if user is a host
      for (const host of hosts) {
        if (host && host.user_id && host.user_id === userID) {
          setIsAllowed(true);
          console.log('isallowed')
          setUserValidated(true);
          return; // Exit the loop once user is found
        }
      }
      // If user is not found among hosts, set validation state
      console.log('notallowed')
      setUserValidated(true);
      return;
    }
  };

  useEffect(() => {
    isUserAllowed(userProfileData.id);
  }, [userProfileData]);

  // If user is not allowed, redirect to event details page
  const handleAllow =  () => {
    console.log('userValidated', userValidated)
    console.log('isAllowed', isAllowed)
    if (userValidated === true) {
      console.log('userValidated', userValidated)
      if (isAllowed === false) {
        console.log('NOT AUTHORIZED')
        navigate(`/event/${eventID}`)
      } else {
        console.log('AUTHORIZED')
      }
      
    } 
  }
  
  useEffect(() => {
    handleAllow();
  }, [userValidated]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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

  useEffect(() => {
    const handleResize = () => {
      // Hide the todo list & host manager if the screen width is less than or equal to a certain threshold
      if (window.innerWidth <= 1400) {
        setOpen(false)
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the resize handler initially
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  const handleEditEvent = () => {
    navigate(`/editevent/${eventID}`);
  }

  return (
    <Container fluid>
      <Row className="gx-5">
        {/* !!EVENT DETAILS card & button !! */}
        <Col
          sm={12}
          md={12}
          lg={4}
          xl={showMenu ? 3 : 4}
          className="event-details-col"
          style={{ position: "relative" }}
        >
          {eventDetails.hosts && (
            <DetailedEventCard {...eventDetails}></DetailedEventCard>
          )} 
          <Tooltip title="Edit Event">
          <Fab 
             onClick={handleEditEvent} 
             size="small" 
             style={{ position: "absolute", top: 0, right: 0, margin:"30px", marginRight:"60px", backgroundColor:"rgba(255, 255, 255, 0.7)", padding:"0" }}>
              <EditIcon alt="Edit Event"/>
            </Fab>
            </Tooltip>
        </Col>

        {/* !!VOLUNTEER MANAGER !! */}
        <Col
          sm={12}
          md={12}
          lg={7}
          xl={showMenu ? 5 : 6}
          className="volunteer-manager-col"
        >
          <Row>
            <VolunteerManager
              approvedVolunteers={approvedVolunteers}
              volunteerApplications={volunteerApplications}
              eventID={eventID}
              roles={roles}
              setRoles={setRoles}
              getEvent={getEvent}
            />
          </Row>
        </Col>

        {/* !!TODO LIST & HOST MANAGER !! */}
        <Col sm={12} md={0} lg={3} xl={4} className="todo-participant-col">
          {showMenu ? (
            <Col className="todo-partipants-col d-flex justify-content-end">
              {eventDetails.hosts && (
                <Col>
                  <Row>
                    <TodoList
                      setShowMenu={setShowMenu}
                      hosts={hosts}
                      approvedVolunteers={approvedVolunteers}
                      showAddToDo={showAddToDo}
                      eventID={eventID}
                    />
                  </Row>
                  <Row style={{}}>
                    <HostsManager
                      eventID={eventID}
                      hosts={hosts}
                      getEvent={getEvent}
                    />
                  </Row>
                </Col>
              )}
            </Col>
          ) : (
            <Box position="relative">
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <IconButton
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  onClick={toggleDrawer(false)}
                >
                  <CloseIcon />
                </IconButton>
                {
                  <Col>
                    <Row >
                      <TodoList
                        setShowMenu={setShowMenu}
                        hosts={hosts}
                        approvedVolunteers={approvedVolunteers}
                        showAddToDo={showAddToDo}
                        eventID={eventID}
                      />
                    </Row>
                    <Row >
                      <HostsManager
                        eventID={eventID}
                        hosts={hosts}
                        getEvent={getEvent}
                      />
                    </Row>
                  </Col>
                }
              </Drawer>
            </Box>
          )}
        </Col>
      </Row>
      {!showMenu && (
        <Box
          position="fixed"
          right="1%"
          top="40%"
          margin="0"
          display="flex"
          alignItems="center"
        >
          <Button
            variant="outlined"
            margin="0"
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "bottom right",
            }}
            onClick={toggleDrawer(!open)}
          >
            To-Do List & Hosts
            <ExpandLessIcon />
          </Button>
        </Box>
      )}
    </Container>
  );
}


