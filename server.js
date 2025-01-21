const express = require('express');
const {serverConfig} = require('./src/config/index');
const apiRouters = require('./src/router/index');
const app = express();

app.use(express.json());

app.use('/api',apiRouters);

app.listen(serverConfig.PORT, () => {
    console.log(`Server successfully running on http://localhost:${serverConfig.PORT}`);
});