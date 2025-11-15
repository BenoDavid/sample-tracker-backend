
const express = require('express');
const router = express.Router();

const STSWNSampleRoutes = require('./STSWNSampleRoutes');

// // Use routes
router.use('/swnsamples', STSWNSampleRoutes);

module.exports = router;
