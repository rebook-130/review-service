const express = require('express');
const path = require('path');
const Routes = require('./controller.js');

const router = express.Router();

router.get('/listing/:listingId/reviews', Routes.getReviews);
router.get('/listing/:listingId/scores', Routes.getScores);

module.exports = router;
