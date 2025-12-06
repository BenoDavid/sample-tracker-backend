// src/controllers/STSWNCollectionController.js
const db = require('../models');
const BaseController = require('./BaseController');
const { STSWNCollectionQty, STSWNCollectionStage, STSWNCollection, STSWNCutting } = db.sequelizeDb2.models; // adjust if using a different sequelize instance

class STSWNCollectionController extends BaseController {
  constructor() {
    super(STSWNCollection);
  }

  async createBatch(req, res) {
    const t = await STSWNCollection.sequelize.transaction();

    try {
      const items = Array.isArray(req.body) ? req.body : [req.body];

      let runningSerial = 1;
      const createdParents = [];
      const allSerialRecords = []; // For returning to client only

      for (const item of items) {
        // Create parent record inside transaction
        const parent = await STSWNCollection.create(item, { transaction: t });
        createdParents.push(parent);

        const qty = item.swnQty || 0;
        const serialList = [];

        for (let i = 0; i < qty; i++) {
          serialList.push({
            collectionId: parent.id,
            serialNo: (runningSerial + i) + '||' + item?.swnNo
          });
        }

        // UI helper fields
        parent.dataValues.serialList = serialList;
        parent.dataValues.expanded = false;

        // Collect for response
        allSerialRecords.push(...serialList);

        // Advance running serial
        runningSerial += qty;

        //
        // 🚀 INSERT IN BATCHES OF 999
        //
        let start = 0;
        const BATCH_SIZE = 999;

        while (start < serialList.length) {
          const chunk = serialList.slice(start, start + BATCH_SIZE);

          await STSWNCollectionQty.bulkCreate(chunk, {
            transaction: t
          });

          start += BATCH_SIZE;
        }
      }

      // Commit all DB operations
      await t.commit();

      return res.status(200).json({
        status: 200,
        message: `STSWNCollection records created successfully`,
        result: {
          parents: createdParents,
          serials: allSerialRecords
        }
      });

    } catch (error) {
      await t.rollback();
      return res.status(500).json({
        status: 500,
        message: error.message,
        result: []
      });
    }
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
      const {
        fromDate,
        toDate,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'DESC',
        search,
        searchField,
        stage = null,
        inOrOut = null,
        ...filters
      } = req.query;

      const offset = (page - 1) * limit;

      // Filtering
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
        endDate.setHours(23, 59, 59, 999);
        filterOptions.createdAt = {
          [Sequelize.Op.between]: [startDate, endDate],
        };
      }

      // Include stages only if stage filter exists
      let inc;
      if (stage == 'stitchingAllocator') {
        inc = [
          {
            model: STSWNCollectionQty,
            as: "pieces",
            where: {
              operator: null
            },
            required: false,
          },
        ];
      } else if (stage == 'indent-admin') {
        inc = stage
          ? [
            {
              model: STSWNCollectionStage,
              as: "stages",
              required: false,
            },
            {
              model: STSWNCutting,
              as: "cuttings",
              required: false,
            }
          ]
          : [];
      } else {
        inc = stage
          ? [
            {
              model: STSWNCollectionStage,
              as: "stages",
              where:
                inOrOut === "in"
                  ? { stageType: stage }
                  : { stageType: stage, outAt: null },
              required: false,
            },
          ]
          : [];
      }



      // Fetch raw data (no filtering based on length yet)
      const items = await this.model.findAndCountAll({
        where: filterOptions,
        include: inc,
        order: [[sortBy, sortOrder.toUpperCase()]],
        // offset: parseInt(offset),
        // limit: parseInt(limit),
      });

      // -----------------------------------------
      // ⭐ APPLY LENGTH-BASED LOGIC HERE
      // -----------------------------------------
      let finalRows = items.rows;

      if (inOrOut === "in") {
        // Want collections that have *no stages*
        finalRows = finalRows.filter(item => Number(item[stage]) < Number(item?.swnQty));
      }
      if (inOrOut === "out") {
        // Want collections that have *stages*
        finalRows = finalRows.filter(item => item?.stages?.length > 0);
      }
      if (stage == 'stitchingAllocator') {
        finalRows = finalRows.filter(item => item?.pieces?.length > 0);

      }
      // Return filtered result
      res.status(200).json({
        status: 200,
        message: `${this.model.name}s fetched successfully`,
        result: finalRows,
        pagination: {
          totalItems: finalRows.length,
          totalPages: Math.ceil(finalRows.length / limit),
          currentPage: parseInt(page),
          pageSize: parseInt(limit),
        },
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
