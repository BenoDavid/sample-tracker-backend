// src/controllers/STSWNCollectionController.js
const db = require('../models');
const BaseController = require('./BaseController');
const { STSWNCollectionStage, STSWNCollection } = db.sequelizeDb2.models; // adjust if using a different sequelize instance

class STSWNCollectionController extends BaseController {
  constructor() {
    super(STSWNCollection);
  }
  async updateBulkDataEach(req, res) {
    const sequelize = STSWNCollection.sequelize; // ensure same instance
    const t = await sequelize.transaction();

    try {
      const reqParams = req.body;

      // -------------------------
      // 1) CREATE STAGES
      // -------------------------
      if (Array.isArray(reqParams?.stages) && reqParams.stages.length > 0) {
        await STSWNCollectionStage.bulkCreate(reqParams.stages, { transaction: t });
      }

      // -------------------------
      // 2) UPDATE COLLECTIONS
      // -------------------------
      if (Array.isArray(reqParams?.collections) && reqParams.collections.length > 0) {
        for (const item of reqParams.collections) {
          const { id, ...data } = item;
          if (!id) continue;

          await STSWNCollection.update(
            data,
            {
              where: { id },
              transaction: t
            }
          );
        }
      }

      // Commit transaction
      await t.commit();

      res.status(200).json({
        status: 200,
        message: `Bulk update successful`,
        result: [],
      });

    } catch (error) {
      // Rollback transaction
      await t.rollback();

      res.status(500).json({
        status: 500,
        message: error.message,
        result: null,
      });
    }
  }


  async getAll(req, res) {
    try {
      // Extract query parameters for pagination, filtering, and sorting
      const { fromDate, toDate, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', stage = null, ...filters } = req.query;

      // Set up pagination
      const offset = (page - 1) * limit;
      const paginationOptions = { offset: parseInt(offset), limit: parseInt(limit) };

      // Set up sorting
      const sortOptions = [[sortBy, sortOrder.toUpperCase()]];

      // Set up filtering
      const filterOptions = {};
      for (const key in filters) {
        filterOptions[key] = filters[key];
      }
      if (fromDate && toDate) {
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);

        // Adjust endDate to include the entire day
        endDate.setHours(23, 59, 59, 999);

        filterOptions.createdAt = {
          [Sequelize.Op.between]: [startDate, endDate],
        };
      }
      let inc = stage ? [
        {
          model: STSWNCollectionStage,
          as: "stages",
          where: { stageType: stage },
          required: false
        }
      ] : [];
      // Combine all options and fetch data
      const items = await this.model.findAndCountAll({
        where: filterOptions,
        include: inc
        // order: sortOptions,
        // ...paginationOptions
      });

      // Respond with paginated data and metadata
      res.status(200).json({
        status: 200,
        message: `${this.model.name}s fetched successfully`,
        result: items.rows,
        pagination: {
          totalItems: items.count,
          totalPages: Math.ceil(items.count / limit),
          currentPage: parseInt(page),
          pageSize: parseInt(limit)
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        result: [],
      });
    }
  }
}

module.exports = new STSWNCollectionController();
