const express = require('express');
const tasksController = require('./tasks.controller');
const mdAuth = require('../../middleware/auth');

const router = express.Router();
router.use(mdAuth.ensureAuth);

router.get('', tasksController.tasks);
router.post('', tasksController.createTasks);
router.put('/:id', tasksController.updateTasks);
router.put('/status/:id', tasksController.updateStatusTasks);
router.delete('/:id', tasksController.deleteTasks);

module.exports = router;
