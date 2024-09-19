const userService = require('./user.service');

const register = async (req, res) => {
  const user  = req.body;
  const result = await userService.register(user);
  res.status(result.status).json(result);
};

const findAll = async (req, res) => {
  const result = await userService.findAll();
  res.status(result.status).json(result);
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const user  = req.body;
  const result = await userService.updateUser(id, user);
  res.status(result.status).json(result);
}

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const result = await userService.deleteUser(id);
  res.status(result.status).json(result);
}

module.exports = {
  register,
  findAll,
  updateUser,
  deleteUser
}
