// src/controllers/STSWNCollectionQtyController.js
const { Sequelize } = require('sequelize');
const db = require('../models');
const BaseController = require('./BaseController');
const { STSWNCollection, STSWNCollectionQty } = db.sequelizeDb2.models; // adjust if using a different sequelize instance

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
  async getOneByCustomKey(req, res) {
    try {
      // Extract query parameters for pagination, filtering, and sorting
      const { ...filters } = req.body;

      // Set up filtering
      const filterOptions = {};


      for (const key in filters) {
        filterOptions[key] = filters[key];
      }

      // Combine all options and fetch data
      const item = await this.model.findOne({
        where: filterOptions, include: [
          {
            model: STSWNCollection,
            as: "collection",
            required: false,
          },
        ]
      });

      // Respond with paginated data and metadata
      res.status(200).json({
        status: 200,
        message: `${this.model.name} fetched successfully`,
        result: item
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        result: {},
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

      
      // Combine all options and fetch data
      const items = await this.model.findAndCountAll({
        where: filterOptions,
        include: [
          {
            model: STSWNCollection,
            as: "collection",
            attributes:['season','sampleType','style','color','size','buyer'],
            required: false,
          },
        ]
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

module.exports = new STSWNCollectionQtyController();
