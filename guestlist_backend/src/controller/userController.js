export const getUser = (req, res) => {
  res.json({
    message: `This is the user with Id ${req.params.userId}`,
  });
};

export const updateUser = (req, res) => {
  res.json({
    message: `Updated user with Id ${req.params.userId}`,
  });
};

export const deleteUser = (req, res) => {
  res.json({
    message: `Deleted the user with Id ${req.params.userId}`,
  });
};
