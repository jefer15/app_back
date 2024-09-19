const express = require('express');
const userController = require('./user.controller');
const mdAuth = require('../../middleware/auth');

const router = express.Router();
router.post('/register', userController.register);

router.use(mdAuth.ensureAuth);
router.get('', userController.findAll);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
