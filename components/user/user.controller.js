const userService = require('./user.service');

const register = async (req, res) => {
  const user  = req.body;
  const result = await userService.register(user);
  res.status(result.status).json(result);
};

const findAll = async (req, res) => {
  const page = req.query.page || 1; // Obtener el parámetro 'page' de la consulta, si no está presente, establecerlo en 1
  const pageSize = req.query.pageSize || 5;
  const searchText = req.query.searchText || '';
  const result = await userService.findAll(page, pageSize, searchText);
  res.status(result.status).json(result);
};

module.exports = {
  register,
  findAll
}
