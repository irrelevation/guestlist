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

export default function CreateEvent() {
  let navigate = useNavigate();
  const [start, setStart] = React.useState(new Date());
  const [end, setEnd] = React.useState(new Date());

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const eventInfo = {
      name: data.get("name"),
      creator: authService.getCurrentUser().user._id,
      start_time: start,
      end_time: end,
    };
    await apiService.createEvent(eventInfo);
    navigate("/events", { replace: true });
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
          Create event
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="location"
                label="Location"
                name="location"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Start Date"
                value={start}
                onChange={(newValue) => {
                  setStart(newValue);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="End Date"
                value={end}
                onChange={(newValue) => {
                  setEnd(newValue);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            CREATE
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
