// src/routes/stswnCollectionQtyRouter.js
const STSWNCollectionQtyController = require('../controllers/STSWNCollectionQtyController');
const BaseRouter = require('./BaseRouter');

const stswnCollectionQtyRouter = new BaseRouter(STSWNCollectionQtyController);

module.exports = stswnCollectionQtyRouter.getRouter();
