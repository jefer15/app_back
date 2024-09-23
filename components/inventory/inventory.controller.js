const inventoryService = require('./inventory.service');

const inventories = async (req, res) => {
  const result = await inventoryService.inventories();
  res.status(result.status).json(result);
};

const createInventory = async (req, res) => {
  const inventory = req.body;
  const result = await inventoryService.createInventory(inventory);
  res.status(result.status).json(result);
};

module.exports = {
  inventories,
  createInventory
}
