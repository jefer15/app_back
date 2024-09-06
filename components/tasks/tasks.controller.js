const tasksService = require('./tasks.service');

const tasks = async (req, res) => {
  const result = await tasksService.tasks();
  res.status(result.status).json(result);
};

const createTasks = async (req, res) => {
  const task  = req.body;
  const result = await tasksService.createTasks(task);
  res.status(result.status).json(result);
};

const updateTasks = async (req, res) => {
  const id = req.params.id;
  const task  = req.body;
  const result = await tasksService.updateTasks(id, task);
  res.status(result.status).json(result);
};

const updateStatusTasks = async (req, res) => {
  const id = req.params.id;
  const status  = req.body.status;
  const result = await tasksService.updateStatusTasks(id, status);
  res.status(result.status).json(result);
};

const deleteTasks = async (req, res) => {
  const id = req.params.id;
  const result = await tasksService.deleteTasks(id);
  res.status(result.status).json(result);
};

module.exports = {
  tasks,
  createTasks,
  updateTasks,
  updateStatusTasks,
  deleteTasks
}
