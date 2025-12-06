// src/controllers/STSWNCuttingController.js
const db = require('../models');
const BaseController = require('./BaseController');
const { STSWNCutting, STSWNCollection } = db.sequelizeDb2.models;

class STSWNCuttingController extends BaseController {
  constructor() {
    super(STSWNCutting);
  }
  async updateBatch(req, res) {
    const sequelize = STSWNCutting.sequelize; // ensure same instance
    const t = await sequelize.transaction();

    try {
      const reqParams = req.body;

      if (Array.isArray(reqParams?.cuttings) && reqParams.cuttings.length > 0) {
        for (const item of reqParams.cuttings) {
          const { id, ...data } = item;
          if (!id) continue;

          await STSWNCutting.update(
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
  async updateBulkDataEach(req, res) {
    const sequelize = STSWNCutting.sequelize; // ensure same instance
    const t = await sequelize.transaction();

    try {
      const reqParams = req.body;


      // -------------------------
      // 1) CREATE STAGES
      // -------------------------
      if (Array.isArray(reqParams?.cuttings) && reqParams.cuttings.length > 0) {
        await STSWNCutting.bulkCreate(reqParams.cuttings, { transaction: t });
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
      const { fromDate, toDate, page = 1, limit = 10, search,
        searchField, sortBy = 'createdAt', sortOrder = 'DESC', ...filters } = req.query;

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

      // 🔍 Dynamic field search
      if (search && searchField) {
        filterOptions[searchField] = {
          [Sequelize.Op.like]: `%${search}%`
        };
      }

      // 🔍 Global search across all model fields
      else if (search) {
        const searchConditions = [];

        for (const attribute of Object.keys(this.model.rawAttributes)) {
          searchConditions.push({
            [attribute]: { [Sequelize.Op.like]: `%${search}%` }
          });
        }

        filterOptions[Sequelize.Op.or] = searchConditions;
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
      filterOptions.outBy = null;
      // Combine all options and fetch data
      const items = await this.model.findAndCountAll({
        where: filterOptions,

        include: [
          {
            model: STSWNCollection,
            as: "collection",
            required: false,
            attributes: { exclude: ["id"] },
          },
        ]
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

module.exports = new STSWNCuttingController();
