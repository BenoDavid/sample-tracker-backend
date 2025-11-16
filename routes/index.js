
const express = require('express');
const router = express.Router();

const STSWNSampleRoutes = require('./STSWNSampleRoutes');
const STSWNCollectionRoutes = require('./STSWNCollectionRoutes');

// // Use routes
router.use('/samples', STSWNSampleRoutes);
router.use('/collections', STSWNCollectionRoutes);

module.exports = router;
