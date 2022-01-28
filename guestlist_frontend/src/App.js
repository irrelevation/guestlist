import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material";
import authService from "./services/auth.service";
import { Fab } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const queryClient = new QueryClient();
const theme = createTheme();

const fabStyle = {
  position: "absolute",
  top: 16,
  right: 16,
};

function App() {
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
          <Fab
            sx={fabStyle}
            aria-label="Add Event"
            color="primary"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </Fab>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
