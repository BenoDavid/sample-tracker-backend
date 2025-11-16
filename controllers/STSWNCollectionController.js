// src/controllers/STSWNCollectionController.js
const db = require('../models');
const BaseController = require('./BaseController');
const { STSWNCollection } = db.sequelizeDb2.models; // adjust if using a different sequelize instance

class STSWNCollectionController extends BaseController {
  constructor() {
    super(STSWNCollection);
  }

}

module.exports = new STSWNCollectionController();
