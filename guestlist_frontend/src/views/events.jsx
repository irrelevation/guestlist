import React from "react";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";
import apiService from "../services/api.service";

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

const fabStyle = {
  position: "fixed",
  bottom: 16,
  right: 16,
};

function Events() {
  let navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery(
    "events",
    apiService.getEvents
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const { events, count } = data.data;
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
          <CelebrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {count} Events
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {events.map((event) => {
            const options = {
              year: "numeric",
              month: "short",
              day: "numeric",
            };
            let date = new Date(event.start_time);

            if (date) date = date.toLocaleDateString(undefined, options);
            return (
              <ListItem key={event._id} onClick={() => navigate(event._id)}>
                <ListItemAvatar>
                  <Avatar>
                    <CircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={event.name}
                  secondary={
                    event.start_time &&
                    date + ` - ${event.guests.length} guests`
                  }
                />
              </ListItem>
            );
          })}
        </List>
        <Zoom key="primary" in={true} unmountOnExit>
          <Fab
            sx={fabStyle}
            aria-label="Add Event"
            color="primary"
            href="events/create"
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default Events;
