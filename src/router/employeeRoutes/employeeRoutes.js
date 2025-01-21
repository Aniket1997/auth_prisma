const express = require('express');
const { addEmployee } = require('../../controller');
const { authorizeRoles,authenticate } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post("/add-employee",authenticate,authorizeRoles(['ADMIN', 'MANAGER']),addEmployee);

module.exports = router;