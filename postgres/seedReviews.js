/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const generator = require('./generatorCsv');

const {
  createTitle, cancellation, paragraphs, dates,
} = require('./seedHelpers');

const createReview = () => {
  const date = dates();
  const line = {
    review_text: paragraphs(),
    time_stamp: date.epoch,
    time_formatted: date.dateFormat,
    cleanliness: Math.ceil(Math.random() * (5 - 2) + 2),
    communication: Math.ceil(Math.random() * (5 - 2) + 2),
    checkinrating: Math.ceil(Math.random() * (5 - 2) + 2),
    accuracy: Math.ceil(Math.random() * (5 - 2) + 2),
    location: Math.ceil(Math.random() * (5 - 2) + 2),
    value: Math.ceil(Math.random() * (5 - 2) + 2),
    listing_id: Math.ceil(Math.random() * (10000000) + 1),
    user_id: Math.ceil(Math.random() * (3000000) + 1),
  };

  const header = Object.keys(line);
  return { line, header };
};

// Create 50 million reviews
generator('/Volumes/sdc/postgres/reviews.csv', '50000000', createReview, 'reviews');
