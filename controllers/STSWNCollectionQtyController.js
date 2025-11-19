// src/controllers/STSWNCollectionQtyController.js
const db = require('../models');
const BaseController = require('./BaseController');
const { STSWNCollectionQty } = db.sequelizeDb2.models; // adjust if using a different sequelize instance

class STSWNCollectionQtyController extends BaseController {
  constructor() {
    super(STSWNCollectionQty);
  }
    async updateBulkDataEach(req, res) {
    try {
      const updates = req.body; // array of objects

      if (!Array.isArray(updates) || updates.length === 0) {
        return res.status(400).json({
          status: 400,
          message: "Request body must be an array",
          result: null,
        });
      }

      const results = [];

      for (const item of updates) {
        const { id, ...data } = item;

        if (!id) continue;

        const [updated] = await this.model.update(data, { where: { id } });

        results.push({ id, updated });
      }

      res.status(200).json({
        status: 200,
        message: `${this.model.name}s updated successfully`,
        result: results,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        result: null,
      });
    }
  }

}

module.exports = new STSWNCollectionQtyController();
