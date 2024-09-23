const express = require('express');
const inventoryController = require('./inventory.controller');
const mdAuth = require('../../middleware/auth');

const router = express.Router();
router.use(mdAuth.ensureAuth);

router.get('', inventoryController.inventories);
router.post('', inventoryController.createInventory);

module.exports = router;
