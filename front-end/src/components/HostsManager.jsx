import React, { useEffect, useState } from "react";
import { updateHosts } from "../utilities/EventUtilities";
import { getUserByEmail } from "../utilities/UserProfileUtilities";

//styling imports
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Card,
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
  DialogTitle,
} from "@mui/material";

function HostsManager({ eventID, hosts, getEvent }) {
  const [hostSearchInput, setHostSearchInput] = useState("");
  const [newHost, setNewHost] = useState({});
  //modal open/close <add hosts>
  const [openModal, setOpenModal] = useState(false);
  const handleopenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false)
    setNewHost({});
  }
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
    console.log("admin page -- NEW HOST:", newHostData);

  };

  const handleSearchHost = () => {
    searchNewHost();
    handleopenModal();
  };

  const handleAddHost = async (userID) => {
    let shouldBeTrue = await updateHost(userID, "add");
    if (shouldBeTrue) {
      console.log("added host successfully");
      getEvent();
      handleCloseModal();
      setNewHost({});
    } else {
      console.log("not able to add host");
    }
  };

  const handleDeleteHost = async (event, userID) => {
    handleDialogClose(event);
    let shouldBeTrue = await updateHost(userID, "remove");
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
    <Card
      id="hostmanager"
      className="flex-column"
      style={{
        padding: "24px",
        minWidth: "300px",
        maxWidth: '100%',
        margin: "50px",
        flex: "1 1 0%" // Ensures that the component can grow and shrink as needed within the flexbox container
      }}
    >
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h2 style={{ width: '100%', textAlign: 'center' }}>Current Hosts</h2>
          <hr />
        </AccordionSummary>
        <AccordionDetails>
          {/* !!! lists all hosts w/ trash icon to delete hosts !!! */}
          <List>
            {hosts.map((host, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar key={host.user_id} src={host.profile_picture}>
                    {" "}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <span className="card-body">{host.display_name}</span>
                  }
                />
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
          <h4>Add Hosts</h4>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <Box
              sx={{ display: "flex", alignItems: "flex-end" }}
              component="form"
              noValidate
              autoComplete="off"
            >
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="enter a user's email"
                variant="standard"
                value={hostSearchInput}
                sx={{ width: "100%", fontSize: "1.5rem" }}
                onChange={(e) => setHostSearchInput(e.target.value)}
                inputProps={{
                  style: { fontSize: "1.2rem" }, // Adjust the font size as needed
                }}
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
                    <Avatar src={newHost.image}> </Avatar>
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
    </Card>
  );
}
export default HostsManager;
