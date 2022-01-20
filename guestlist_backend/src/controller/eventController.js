export const createEvent = (req, res) => {
  res.json({
    message: "event created",
  });
};
export const getEvent = (req, res) => {
  res.json({
    message: `This is event #${req.params.eventId}`,
  });
};
export const updateEvent = (req, res) => {
  res.json({
    message: "event updated",
  });
};
export const deleteEvent = (req, res) => {
  res.json({
    message: "event deleted",
  });
};
export const getAllGuests = (req, res) => {
  res.json({
    message: `All guests of event #${req.params.eventId}`,
  });
};
export const addGuest = (req, res) => {
  res.json({
    message: `${req.body.name} was added to the guest list`,
  });
};
export const getGuest = (req, res) => {
  res.json({
    message: `This is guest #${req.params.guest}`,
  });
};
