const {registerUser,loginUser} = require('./authController');
const {addEmployee} = require('./employeeControllers');

module.exports={
    registerUser,
    loginUser,
    addEmployee
}