// src/routes/stswnCollectionRouter.js
const STSWNCollectionController = require('../controllers/STSWNCollectionController');
const BaseRouter = require('./BaseRouter');

const stswnCollectionRouter = new BaseRouter(STSWNCollectionController);

module.exports = stswnCollectionRouter.getRouter();
