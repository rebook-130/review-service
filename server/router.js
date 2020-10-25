const express = require('express');
const path = require('path');
const Routes = require('./controller.js');

const router = express.Router();

router.get('/listing*', (req, res) => {
  //res.setHeader('content-type', 'text/html');
  res.sendFile(path.resolve(`${__dirname}/../client/dist/index.html`));
});

router.get('/api/listing/:listingId/reviews', Routes.getReviews);

router.get('/api/listing/:listingId/scores', Routes.getScores);

module.exports = router;
