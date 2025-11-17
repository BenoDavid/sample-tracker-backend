
const express = require('express');
const router = express.Router();

const STSWNSampleRoutes = require('./STSWNSampleRoutes');
const STSWNCollectionRoutes = require('./STSWNCollectionRoutes');
const STSWNCollectionStageRoutes = require('./STSWNCollectionStageRoutes');

// // Use routes
router.use('/samples', STSWNSampleRoutes);
router.use('/collections', STSWNCollectionRoutes);
router.use('/collectionstages', STSWNCollectionStageRoutes);

module.exports = router;
