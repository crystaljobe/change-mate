import { useParams, Link, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";

//styling imports
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

function HostsManager() {
  const [hostSearchInput, setHostSearchInput] = useState("");
  const [newHost, setNewHost] = useState({});
  //TODO: need to search for users by email
  // const searchNewHost = async () => {
  //   // const newHostData = await getProfileInfo({ 'user': "rs@cp.com" });
  //   newHostData ? setNewHost(newHostData) : setNewHost(null);
  //   console.log("admin page -- newHostData:", newHostData);
  // };
  return (
    <>
      <Card sx={{ width: "75%", margin: "2vw"}}>
        <CardHeader title="Add Hosts" />
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
            onChange={(e) => setHostSearchInput(e.target.value)}
          />
          <IconButton>
            <AddIcon />
          </IconButton>
        </Box>
      </Card>
    </>
  );
}
export default HostsManager;
