// src/routes/stswnCollectionStageRouter.js
const STSWNCollectionStageController = require('../controllers/STSWNCollectionStageController');
const BaseRouter = require('./BaseRouter');

const stswnCollectionStageRouter = new BaseRouter(STSWNCollectionStageController);

module.exports = stswnCollectionStageRouter.getRouter();
