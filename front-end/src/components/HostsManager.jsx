import { useParams, Link, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { updateHosts } from "../utilities/EventUtilities";
import { getUserByEmail } from "../utilities/UserProfileUtilities";

//styling imports
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";

import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  TextField,
  Button,
  Box,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";

function HostsManager({ eventID, hosts, getEvent }) {
  const [hostSearchInput, setHostSearchInput] = useState("");
  const [newHost, setNewHost] = useState({});
  //modal open/close <add hosts>
  const [openModal, setOpenModal] = useState(false);
  const handleopenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  //dialog open/close <remove hosts>
  const [openDialog, setDialogOpen] = useState(false);
  const handleClickOpenDialog = () => setDialogOpen(true);
  const handleDialogClose = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDialogOpen(false);
  };

  //search for users by email
  const searchNewHost = async () => {
    let email = hostSearchInput;
    let newHostData = await getUserByEmail(email);
    if (newHostData) {
      setNewHost(newHostData);
    } else {
      console.log("No users by this email");
    }
    console.log("admin page -- NEW HOST:", newHost);
  };

  const handleSearchHost = () => {
    searchNewHost();
    handleopenModal();
  };

  const handleAddHost = (userID) => {
    let shouldBeTrue = updateHost(userID, "add");
    if (shouldBeTrue) {
      console.log("added host successfully");
      getEvent();
      handleCloseModal();
      setNewHost({});
    } else {
      console.log("not able to add host");
    }
  };

  const handleDeleteHost = (event, userID) => {
    handleDialogClose(event);
    let shouldBeTrue = updateHost(userID, "remove");
    if (shouldBeTrue) {
      console.log("host removed successfully");
      getEvent();
    } else {
      console.log("not able to remove host");
    }
  };

  const updateHost = async (user_id, addremove) => {
    const response = await updateHosts(eventID, user_id, addremove);
    console.log("update host", response);
    setHostSearchInput("");
    return response;
  };

  return (
    <>
      <div style={{ marginTop: "2vw" }}>
        <Accordion defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Current Hosts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* !!! lists all hosts w/ trash icon to delete hosts !!! */}
            <List>
              {hosts.map((host, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar key={host.user_id} src={host.profile_picture}> </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={host.display_name} />
                  <IconButton
                    edge="start"
                    aria-label="delete"
                    onClick={handleClickOpenDialog}
                    size="small"
                  >
                    <DeleteIcon />

                    {/* !!! opens a dialog to confirm deletion !!! */}
                    <Dialog
                      open={openDialog}
                      onClose={handleDialogClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"ARE YOU SURE YOU WANT TO DELETE THIS HOST?"}
                      </DialogTitle>
                      <DialogActions>
                        <Button
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteHost(event, host.user_id);
                          }}
                        >
                          Yes
                        </Button>
                        <Button
                          onClick={(event) => handleDialogClose(event)}
                          autoFocus
                        >
                          No
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {/* !!!  opens search field to add a host !!! */}
            <Typography>Add Hosts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
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
                <IconButton onClick={handleSearchHost}>
                  <AddIcon />
                </IconButton>
              </Box>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* !!!  Modal opens to confirm searched user is correct user  !!! */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
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
            {Object.keys(newHost).length ? (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                User Found:
                <List>
                  <ListItem>
                    {" "}
                    <ListItemAvatar>
                      <Avatar src={newHost.profile_picture}> </Avatar>
                    </ListItemAvatar>
                    <ListItemText>{newHost.display_name}</ListItemText>
                    <IconButton
                      edge="start"
                      aria-label="delete"
                      onClick={() => handleAddHost(newHost.id)}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItem>
                </List>
              </Typography>
            ) : (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  No user with that email, try again.
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}
export default HostsManager;
