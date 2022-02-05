import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material";
import authService from "./services/auth.service";
import { Fab } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

const queryClient = new QueryClient();
const theme = createTheme();

const logoutStyle = {
  position: "fixed",
  top: 16,
  right: 16,
};
const homeStyle = {
  position: "fixed",
  top: 16,
  left: 16,
};

function App() {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <Outlet />
          {user && (
            <Fab
              sx={logoutStyle}
              aria-label="Add Event"
              color="primary"
              onClick={handleLogout}
            >
              <LogoutIcon />
            </Fab>
          )}
          {user && (
            <Fab
              sx={homeStyle}
              aria-label="Home"
              color="primary"
              onClick={() => navigate("/events")}
            >
              <HomeIcon />
            </Fab>
          )}
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
