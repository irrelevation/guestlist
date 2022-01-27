import React from "react";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Be My Guest
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
