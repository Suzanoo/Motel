const express = require('express');
const controller = require('../controller/controller');
const routes = express.Router();

routes.get('/api', controller.hello);

module.exports = routes;
