import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import DateTimePicker from "@mui/lab/DateTimePicker";
import apiService from "../services/api.service";
import { Copyright } from "../components/copyright";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useParams } from "react-router-dom";

export default function AddGuest() {
  let navigate = useNavigate();
  const { id: eventId } = useParams();

  const [guestFieldCount, setGuestFieldCount] = React.useState(2);

  const incrementGuestFieldCount = () =>
    setGuestFieldCount((prevState) => prevState + 1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const guests = [];
    for (var guest of data.values()) {
      guests.push(guest);
    }
    await apiService.addGuests({ guests, eventId });
    navigate("/events/" + eventId, { replace: true });
  };

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
        <Typography component="h1" variant="h5">
          Add Guest
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="guest1"
                required
                fullWidth
                id="guest1"
                label="Guest 1"
                autoFocus
              />
            </Grid>
            {[...Array(guestFieldCount)].map((el, index) => {
              index += 2;
              return (
                <Grid item xs={12} key={index}>
                  <TextField
                    name={"guest " + index}
                    fullWidth
                    id={"guest " + index}
                    label={"Guest " + index}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => incrementGuestFieldCount()}
          >
            <AddCircleIcon />
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ADD
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
