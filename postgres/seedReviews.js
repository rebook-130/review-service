/* eslint-disable camelcase */
/* eslint-disable no-console */
const generator = require('./generator');
const {
  createTitle, cancellation, paragraphs, dates,
} = require('./seedHelpers');

const createReview = () => {
  const date = dates();
  const review_text = paragraphs();
  const time_stamp = date.epoch;
  const time_formatted = date.dateFormat;

  const cleanliness = Math.ceil(Math.random() * (5 - 2) + 2);
  const communication = Math.ceil(Math.random() * (5 - 2) + 2);
  const checkinrating = Math.ceil(Math.random() * (5 - 2) + 2);
  const accuracy = Math.ceil(Math.random() * (5 - 2) + 2);
  const location = Math.ceil(Math.random() * (5 - 2) + 2);
  const value = Math.ceil(Math.random() * (5 - 2) + 2);

  const listing_id = Math.ceil(Math.random() * (10000000) + 1);
  const user_id = Math.ceil(Math.random() * (3000000) + 1);

  const line = `${review_text},${time_stamp},${time_formatted},${cleanliness},${communication},${checkinrating},${accuracy},${location},${value},${listing_id},${user_id}\n`;

  return line;
};

// Create 70 million reviews

// generator('data/reviews_1.csv', '10000000', createReview, 'reviews');
// generator('data/reviews_2.csv', '10000000', createReview, 'reviews');
// generator('data/reviews_3.csv', '10000000', createReview, 'reviews');
// generator('data/reviews_4.csv', '10000000', createReview, 'reviews');
generator('data/reviews_5.csv', '10000000', createReview, 'reviews');
generator('data/reviews_6.csv', '10000000', createReview, 'reviews');
// generator('data/reviews_7.csv', '10000000', createReview, 'reviews');
