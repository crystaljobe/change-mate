import { useState } from "react";
import {
  createVolunteerRole,
  deleteVolunteerRole,
  getVolunteerApplication,
  putApplicationDecision,
} from "../utilities/VolunteerUtilities";
//styling imports
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Modal,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

function VolunteerManager({
  roles,
  setRoles,
  approvedVolunteers,
  volunteerApplications,
  eventID,
  getEvent
}) {
 
  const [openModal, setOpenModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [numVolunteersNeeded, setnumVolunteersNeeded] = useState("")
  const [selectedVolunteerApplication, setSelectedVolunteerApplication] = useState({})

  const handleOpenModal = (applicant) => {
    setSelectedApplicant(applicant);
    setOpenModal(true);
    getVolApplication(applicant.application_id)
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddRole = () => {
    if (newRole && numVolunteersNeeded) {
      postVolunteerRole(newRole);
      setNewRole("");
      setnumVolunteersNeeded("");
    }
  };

  const handleDeleteRole = (role) => {
    const deleteThisRole = volunteerApplications.filter((roleInstance) => roleInstance.role === role)
    deleteVolRole(deleteThisRole[0].id)
    setRoles(roles.filter((roleName) => roleName !== role))
  };

  //sends post request creating a volunteer role
  const postVolunteerRole = async (newRole) => {
    try {
      let roleName = newRole;
      await createVolunteerRole(eventID, roleName, Number(numVolunteersNeeded));
      getEvent();
    } catch (error) {
      console.error("Failed to create a new volunteer role", error);
    }

  };

  //need to pass in roleID ---> delete a volunteer role
  const deleteVolRole = async (roleID) => {
    const responseStatus = await deleteVolunteerRole(eventID, roleID);
    console.log('delete role - response status', responseStatus)
  };

  //view/get a volunteer application
  const getVolApplication = async (applicationID) => {
    const applicationDetails = await getVolunteerApplication(applicationID);
    setSelectedVolunteerApplication(applicationDetails)
  };

  //accept/reject volunteer application
  const volunteerDecision = async (applicationID, applicationDecision) => {
    try {
      await putApplicationDecision(applicationID, applicationDecision);
    } catch (error) {
      console.error("Failed to give application decision", error);
    }
  };
  const handleAccept = () => {
    const shoulBeTrue = volunteerDecision(selectedApplicant.application_id, "Approved")
    if (shoulBeTrue){console.log('accepted application successfully')}
    handleCloseModal();
  }
   const handleReject = () => {
     volunteerDecision(selectedApplicant.application_id, "Denied");
    if (shoulBeTrue){console.log('rejected application successfully')}
     handleCloseModal();
   };

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Pending Volunteer Applications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* volunteer applications/applicants  */}
          <List>
            {volunteerApplications.map((volRoleInstance, index) => (
              // <Accordion>
              //   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              //     <AccordionDetails>
              <List key={index}>
                {/* {volRoleInstance.role} */}
                {volRoleInstance.applicants &&
                  volRoleInstance.applicants.map((applicant, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => handleOpenModal(applicant)}
                    >
                      <ListItemAvatar key={applicant.user_id}>
                        <Avatar key={applicant.user_id}>
                          {applicant.profile_picture}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={applicant.display_name}
                        secondary={`Applying for: ${volRoleInstance.role}`}
                      />
                    </ListItem>
                  ))}
              </List>
              //     </AccordionDetails>
              //   </AccordionSummary>
              // </Accordion>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Assigned Volunteer Roles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="New Role"
            variant="outlined"
            fullWidth
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddRole()}
          />
          <TextField
            label="Number of volunteers needed"
            variant="outlined"
            fullWidth
            value={numVolunteersNeeded}
            onChange={(e) => setnumVolunteersNeeded(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddRole()}
          />

          {/* roles = arr of string role names */}
          {roles &&
            roles.map((role, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <IconButton
                    edge="start"
                    aria-label="delete"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteRole(role);
                    }}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography sx={{ flexGrow: 1 }}>{role}</Typography>
                </AccordionSummary>

                {/* APPROVED VOLUNTEERS  an arr of obj {id<applicant id>, role, user_id, display_name, profile_picture}*/}
                <AccordionDetails>
                  <List>
                    {approvedVolunteers.map((volunteer) => (
                      <ListItem
                        key={volunteer.user_id}
                        button
                        onClick={() => handleOpenModal(volunteer)}
                      >
                        <ListItemAvatar>
                          <Avatar>{volunteer.profile_picture}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={volunteer.display_name} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
        </AccordionDetails>
      </Accordion>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="volunteer-application-modal"
        aria-describedby="volunteer-application-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6">
            Application
          </Typography>
          <Typography id="volunteer-application-details" sx={{ mt: 2 }}>
            {selectedApplicant
              ? `Email: ${selectedVolunteerApplication.email}`
              : ""}
          </Typography>
          <Typography id="volunteer-application-details" sx={{ mt: 2 }}>
            {selectedApplicant
              ? `Phone Number: ${selectedVolunteerApplication.phone_number}`
              : ""}
          </Typography>

          <Typography id="volunteer-application-details" sx={{ mt: 2 }}>
            {selectedApplicant
              ? `Preferred Contact Method: ${selectedVolunteerApplication.preferred_contact_method}`
              : ""}
          </Typography>

          <Typography id="volunteer-application-details" sx={{ mt: 2 }}>
            {selectedApplicant
              ? `Availability: ${selectedVolunteerApplication.availability}`
              : ""}
          </Typography>
          <Typography id="volunteer-application-details" sx={{ mt: 2 }}>
            {selectedApplicant
              ? `Previously Volunteered: ${selectedVolunteerApplication.return_volunteer}`
              : ""}
          </Typography>
          <Typography id="volunteer-application-details" sx={{ mt: 2 }}>
            {selectedApplicant
              ? `Interested because: ${selectedVolunteerApplication.volunteer_interest}`
              : ""}
          </Typography>
          <Typography id="volunteer-application-details" sx={{ mt: 2 }}>
            {selectedApplicant
              ? `Relevant experience: ${selectedVolunteerApplication.volunteer_experience}`
              : ""}
          </Typography>

          <Button onClick={handleAccept} sx={{ mt: 2 }}>
            Accept
          </Button>
          <Button onClick={handleReject} sx={{ mt: 2 }}>
            Reject
          </Button>
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default VolunteerManager;
