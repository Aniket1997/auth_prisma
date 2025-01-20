const jwt = require('jsonwebtoken');
const {serverConfig} = require('../config/index');
const dotenv = require('dotenv');

dotenv.config();

const {JWT_TOKEN} = serverConfig;

const tokenGenerate = async (user) => {
    return jwt.sign({ id: user.id, role: user.role },JWT_TOKEN, { expiresIn: '1h' });
};

module.exports = {
    tokenGenerate
};
