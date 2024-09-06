const authService = require('./auth.service');

const login = async (req, res) => {
  const user = req.body;
  const result = await authService.login(user);
  res.status(result.status).json(result);
};

module.exports = {
  login
}
