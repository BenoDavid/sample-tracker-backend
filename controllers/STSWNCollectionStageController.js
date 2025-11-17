// src/controllers/STSWNCollectionStageController.js
const db = require('../models');
const BaseController = require('./BaseController');
const { STSWNCollectionStage } = db.sequelizeDb2.models; // adjust if using a different sequelize instance

class STSWNCollectionStageController extends BaseController {
  constructor() {
    super(STSWNCollectionStage);
  }

}

module.exports = new STSWNCollectionStageController();
