import { useState } from "react";
import {
  createVolunteerRole,
  deleteVolunteerRole,
} from "../utilities/EventUtilities";
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
}) {
 
  const [openModal, setOpenModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [numVolunteersNeeded, setnumVolunteersNeeded] = useState(null)

  const handleOpenModal = (applicant) => {
    setSelectedApplicant(applicant);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddRole = () => {
    if (newRole && numVolunteersNeeded) {
      postVolunteerRole(newRole);
      setRoles([...roles, newRole]);
      setNewRole("");
      setnumVolunteersNeeded(null);
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
      await createVolunteerRole(eventID, roleName, numVolunteersNeeded);
    } catch (error) {
      console.error("Failed to create a new volunteer role", error);
    }
  };

  //need to pass in roleID ---> delete a volunteer role
  const deleteVolRole = async (roleID) => {
    const responseStatus = await deleteVolunteerRole(eventID, roleID);
    console.log('delete role - response status', responseStatus)
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
                {volRoleInstance.role}
                {volRoleInstance.applicants &&
                  volRoleInstance.applicants.map((applicant) => (
                    <ListItem
                      key={applicant.id}
                      button
                      onClick={() => handleOpenModal(applicant)}
                    >
                      <ListItemAvatar key={applicant.user_id}>
                        <Avatar key={applicant.user_id}>
                          {applicant.profile_picture}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={applicant.user_id}
                        secondary={volRoleInstance.role}
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
          <Typography
            id="volunteer-application-modal"
            variant="h6"
            component="h2"
          >
            {selectedApplicant ? selectedApplicant.name : ""}
          </Typography>
          <Typography id="volunteer-application-details" sx={{ mt: 2 }}>
            {selectedApplicant ? selectedApplicant.applicationDetail : ""}
          </Typography>
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default VolunteerManager;
