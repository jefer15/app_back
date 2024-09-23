const organizationService = require('./organization.service');

const organizations = async (req, res) => {
  const result = await organizationService.organizations();
  res.status(result.status).json(result);
};

const createOrganization = async (req, res) => {
  const organization = req.body;
  const result = await organizationService.createOrganization(organization);
  res.status(result.status).json(result);
};

const updateOrganization = async (req, res) => {
  const id = req.params.id;
  const organization = req.body;
  const result = await organizationService.updateOrganization(id, organization);
  res.status(result.status).json(result);
};

const deleteOrganization = async (req, res) => {
  const id = req.params.id;
  const result = await organizationService.deleteOrganization(id);
  res.status(result.status).json(result);
};

module.exports = {
  organizations,
  createOrganization,
  updateOrganization,
  deleteOrganization
}
