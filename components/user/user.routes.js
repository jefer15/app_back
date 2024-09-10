const express = require('express');
const userController = require('./user.controller');
const mdAuth = require('../../middleware/auth');

const router = express.Router();
router.post('/register', userController.register);

router.use(mdAuth.ensureAuth);
router.post('', userController.findAll);

module.exports = router;
