const cassandra = require('../database/index');

const getReviews = (req, res) => {
  const { listingId } = req.params;
  const query = 'SELECT id, user_first_name, user_avatar, review_text, time_formatted FROM reviews_by_listing WHERE listing_id = ?';
  cassandra.execute(query, [listingId], { prepare: true })
    .then((result) => res.send(result.rows))
    .catch((err) => res.send(err));
};

const getScores = (req, res) => {
  const { listingId } = req.params;
  const query = 'SELECT cleanliness_avg,communication_avg,checkinrating_avg,accuracy_avg,location_avg,value_avg,overall_avg FROM scores_by_listing WHERE listing_id = ?';
  cassandra.execute(query, [listingId], { prepare: true })
    .then((result) => res.send(result.rows[0]))
    .catch((err) => res.send(err));
};

module.exports = { getReviews, getScores };
