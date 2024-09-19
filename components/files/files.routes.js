const express = require('express');
const filesController = require('./files.controller');
const mdAuth = require('../../middleware/auth');

const router = express.Router();

router.use(mdAuth.ensureAuth);

module.exports = router;
