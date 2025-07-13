const express = require('express');
const router = express.Router();
const { calculateScore, getOffers } = require('../controllers/scoreController');

router.post('/score', calculateScore);
router.get('/offers', getOffers);

module.exports = router;
