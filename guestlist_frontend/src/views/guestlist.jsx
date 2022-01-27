import React from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

function Guestlist() {
  const { id } = useParams();

  return <Typography>Guestlist {id}</Typography>;
}

export default Guestlist;
