// src/controllers/STSWNSampleController.js
const db = require('../models');
const BaseController = require('./BaseController');
const { STSWNSample } = db.sequelizeDb1.models; // adjust if using a different sequelize instance

class STSWNSampleController extends BaseController {
  constructor() {
    super(STSWNSample);
  }

}

module.exports = new STSWNSampleController();
