const express = require('express');
const bodyParser = require('body-parser');

// const config = require('./config');
// const router = require('./src/router');
// const flow = require('./src/flows')
const app = express();

app.use(bodyParser.json());

// router.use(app);

app.listen(config.api.port, () => console.log('App listening on port: ' + config.api.port + '\n' + JSON.stringify(app.settings)));
