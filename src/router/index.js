const express = require('express');
const authRoutes = require('./authRoutes/authRoutes');
const employeeRoutes = require('./employeeRoutes/employeeRoutes');
const router = express.Router();

router.use('/auth',authRoutes);
router.use('/employee',employeeRoutes);

module.exports= router
