const { hashedPassword, comparePassword } = require('./password');
const { tokenGenerate } = require('./jwt');

module.exports = {
    hashedPassword,
    comparePassword,
    tokenGenerate
};