import React, { useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/api.service";
import { useQuery } from "react-query";

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Copyright } from "../components/copyright";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircleIcon from "@mui/icons-material/Circle";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Zoom from "@mui/material/Zoom";
import { useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { TextField } from "@mui/material";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

function Guestlist() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, isError, data, error } = useQuery(["event", id], () =>
    apiService.getEvent(id)
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const { guests } = data.data.event;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <MenuBookIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Guests
        </Typography>
        <TextField
          sx={{
            mt: 2,
            mb: 2,
          }}
          id="outlined-search"
          label="Search Guest"
          type="search"
          width="100%"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {guests
            .filter((guest) => guest.includes(searchTerm))
            .map((guest, index) => {
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    {/* <Avatar>
                      <CircleIcon />
                    </Avatar> */}
                  </ListItemAvatar>
                  <ListItemText primary={guest} />
                </ListItem>
              );
            })}
        </List>
        <Zoom key="primary" in={true} unmountOnExit>
          <Fab
            sx={fabStyle}
            aria-label="Add Gust"
            color="primary"
            href={`${id}/addGuest`}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default Guestlist;
