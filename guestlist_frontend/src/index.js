import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./views/events";
import Guestlist from "./views/guestlist";
import SignUp from "./views/SignUp";
import Login from "./views/login";
import CreateEvent from "./views/createEvent";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />} />
        <Route path="events" element={<Events />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="events/:id" element={<Guestlist />} />
        <Route path="events/:id/addGuest" element={<addGuest />} />
        <Route path="signUp" element={<SignUp />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
