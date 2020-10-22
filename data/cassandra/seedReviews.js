/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const generator = require('../generatorCsv');

const {
  createTitle, cancellation, paragraphs, dates,
} = require('./seedHelpers');

const random = function random(min, max) { Math.ceil(Math.random() * (max - min) + min); };

const createReview = () => {
  const date = dates();
  const line = {
    id: null,
    review_text: paragraphs(),
    time_stamp: date.epoch,
    time_formatted: date.dateFormat,
    cleanliness: random(5, 2),
    communication: random(5, 2),
    checkinrating: random(5, 2),
    accuracy: random(5, 2),
    location: random(5, 2),
    value: random(5, 2),
    listing_id: random(1, 5000000),
    user_id: random(1, 3000000),
  };

  const header = Object.keys(line);
  return { line, header };
};

// Create 50 million reviews
generator('/Volumes/sdc/cassandra/reviews.csv', '50000000', createReview, 'reviews');
