const dotenv = require('dotenv');
dotenv.config();

const serverConfig = {
    PORT: process.env.PORT || 3000, 
    JWT_TOKEN : process.env.TOKEN,
}
module.exports = {
    serverConfig
};
