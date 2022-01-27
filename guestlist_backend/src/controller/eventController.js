import { logger } from "../logger";
import { Event } from "../models/eventModel";

export const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.json({
    message: "Event created",
    data: event,
  });
};

export const getEvent = async (req, res) => {
  console.log(req.user);
  const event = await Event.findById(req.params.eventId);
  const status = event ? 200 : 204;
  res.status(status).json({
    data: event,
  });
};

export const updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
  const status = event ? 200 : 204;
  res.status(status).json({
    message: "event updated",
    data: event,
  });
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.eventId);
  const status = event ? 200 : 204;
  res.status(status).json({
    message: "event deleted",
  });
};

export const getEventsOf = async (req, res) => {
  const events = await Event.find({ creator: req.params.userId });
  const status = events ? 200 : 204;
  res.status(status).json({
    count: events.length,
    events,
  });
};

export const getAllGuests = async (req, res) => {
  const { guests } = await Event.findById(req.params.eventId);
  const status = guests ? 200 : 204;
  res.status(status).json({
    count: guests.length,
    guests,
  });
};

export const getGuest = async (req, res) => {
  const { guests } = await Event.findById(req.params.eventId);
  const guest = guests.filter((guest) => guest.name === req.params.guest);
  const status = guest.length > 0 ? 200 : 204;
  res.status(status).json({
    data: guest,
  });
};

export const addGuest = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.eventId, { $push: { guests: req.body } }, { new: true });
  const status = event ? 200 : 204;
  res.status(status).json({
    message: `${req.body.name} was added to the guest list`,
    data: event,
  });
};

export const updateGuest = async (req, res) => {
  const event = await Event.updateOne(
    { _id: req.params.eventId, "guests.name": req.params.guest },
    { "guests.$": req.body },
    { new: true }
  );
  const status = event.matchedCount > 0 ? 200 : 204;
  res.status(status).json({
    message: `Updated guestlist entry for  ${req.body.name}`,
  });
};

export const deleteGuest = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.eventId, { $pull: { guests: { name: req.params.guest } } });
  res.json({
    message: `Deleted ${req.params.guest} from the guestlist`,
    data: event,
  });
};
