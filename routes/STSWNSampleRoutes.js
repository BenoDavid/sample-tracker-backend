// src/routes/stswnSampleRouter.js
const STSWNSampleController = require('../controllers/STSWNSampleController');
const BaseRouter = require('./BaseRouter');

const stswnSampleRouter = new BaseRouter(STSWNSampleController);

module.exports = stswnSampleRouter.getRouter();
