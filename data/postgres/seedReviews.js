/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const generator = require('../generatorCsv');

const {
  createTitle, cancellation, paragraphs, dates,
} = require('../seedHelpers');

const random = function random(min, max) { Math.ceil(Math.random() * (max - min) + min); };

const createReview = () => {
  const date = dates();
  const line = {
    review_text: paragraphs(),
    time_stamp: date.epoch,
    time_formatted: date.dateFormat,
    cleanliness: random(2, 5),
    communication: random(2, 5),
    checkinrating: random(2, 5),
    accuracy: random(2, 5),
    location: random(2, 5),
    value: random(2, 5),
    listing_id: random(1, 5000000),
    user_id: random(1, 3000000),
  };

  const header = Object.keys(line);
  return { line, header };
};

// Create 50 million reviews
generator('/Volumes/sdc/postgres/reviews.csv', '50000000', createReview, 'reviews');
