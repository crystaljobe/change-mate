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
  approvedVolunteers,
  volunteerApplications,
  eventID,
}) {
  //   const [volunteers, setVolunteers] = useState({
  //     applications: [
  //       {
  //         id: 1,
  //         name: "Alice Johnson",
  //         role: "Event Coordinator",
  //         applicationDetail:
  //           "I have experience in event planning and coordination.",
  //       },
  //       {
  //         id: 2,
  //         name: "Bob Smith",
  //         role: "Food Services",
  //         applicationDetail: "Previously volunteered at similar events.",
  //       },
  //     ],
  //     roles: [
  //       {
  //         role: "Event Coordinator",
  //         volunteers: [
  //           {
  //             id: 1,
  //             name: "Charlie Davis",
  //             applicationDetail:
  //               "I am skilled in AV setups and technical troubleshooting.",
  //           },
  //         ],
  //       },
  //     ],
  //   });

  //   const handleAddRole = () => {
  //     if (newRole) {
  //   setVolunteers((prev) => ({
  //     ...prev,
  //     roles: [...prev.roles, { role: newRole, volunteers: [] }],
  //   }));
  //   setNewRole("");
  // }
  //   };

  const [openModal, setOpenModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [newRole, setNewRole] = useState("");

  const handleOpenModal = (applicant) => {
    setSelectedApplicant(applicant);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddRole = () => {
    if (newRole) {
      postVolunteerRole(newRole);
      setRoles([...roles, newRole]);
      setNewRole("");
    }
  };

  const handleDeleteRole = (roleIndex) => {
    setVolunteers((prev) => ({
      ...prev,
      roles: prev.roles.filter((_, index) => index !== roleIndex),
    }));
  };

  //TODO: need roleName & numVolunteersNeeded useStates from vol component -- creating a volunteer role
  const postVolunteerRole = async (newRole) => {
    e.preventDefault();
    try {
      let roleName = newRole;
      await createVolunteerRole(eventID, roleName, numVolunteersNeeded);
    } catch (error) {
      console.error("Failed to create a new volunteer role", error);
    }
  };

  //TODO: need to pass in roleID ---> delete a volunteer role
  const deleteVolRole = async (roleID) => {
    const responseStatus = await deleteVolunteerRole(roleID);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Volunteer Applications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* volunteer applications/applicants  */}
          {volunteerApplications.map((volRoleInstance) => (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <AccordionDetails>
                  <List key={volRoleInstance.id}>
                    {volRoleInstance.role}
                    {volRoleInstance.applicants &&
                      volRoleInstance.applicants.map((applicant) => (
                        <ListItem
                          key={applicant.id}
                          button
                          onClick={() => handleOpenModal(applicant)}
                        >
                          <ListItemAvatar>
                            <Avatar>{applicant.profile_picture}</Avatar>
                          </ListItemAvatar>
                           <ListItemText
                                primary={applicant.display_name} />
                        </ListItem>
                      ))}
                  </List>
                </AccordionDetails>
              </AccordionSummary>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Current Volunteer Roles</Typography>
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
                      handleDeleteRole(index);
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
