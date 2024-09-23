const express = require('express');
const organizationController = require('./organization.controller');
const mdAuth = require('../../middleware/auth');

const router = express.Router();
router.use(mdAuth.ensureAuth);

router.get('', organizationController.organizations);
router.post('', organizationController.createOrganization);
router.put('/:id', organizationController.updateOrganization);
router.delete('/:id', organizationController.deleteOrganization);

module.exports = router;
