// src/routes/stswnCuttingRouter.js
const STSWNCuttingController = require('../controllers/STSWNCuttingController');
const BaseRouter = require('./BaseRouter');

const stswnCuttingRouter = new BaseRouter(STSWNCuttingController);

module.exports = stswnCuttingRouter.getRouter();
