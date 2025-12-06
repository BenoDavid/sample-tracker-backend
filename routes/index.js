
const express = require('express');
const router = express.Router();

const STSWNSampleRoutes = require('./STSWNSampleRoutes');
const STSWNCollectionRoutes = require('./STSWNCollectionRoutes');
const STSWNCollectionStageRoutes = require('./STSWNCollectionStageRoutes');
const STSWNCollectionQtyRoutes = require('./STSWNCollectionQtyRoutes');
const STSWNCuttingRoutes = require('./STSWNCuttingRoutes');

// // Use routes
router.use('/samples', STSWNSampleRoutes);
router.use('/collections', STSWNCollectionRoutes);
router.use('/collectionstages', STSWNCollectionStageRoutes);
router.use('/collectionqtys', STSWNCollectionQtyRoutes);
router.use('/cutting', STSWNCuttingRoutes);

module.exports = router;
