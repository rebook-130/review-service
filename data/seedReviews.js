/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const faker = require('faker');
const generator = require('./generatorCsv');

const {
  createTitle, cancellation, paragraphs, dates,
} = require('./seedHelpers');

const random = (min, max) => Math.floor((Math.random() * (max - min)) + 1);

const createReviewText = () => {
  const date = dates();
  const line = {
    id: 0,
    listing_id: random(1, 5000000),
    user_first_name: faker.name.firstName(),
    user_avatar: faker.internet.avatar(),
    review_text: paragraphs(),
    time_stamp: date.epoch,
    time_formatted: date.dateFormat,

    cleanliness: random(2, 5),
    communication: random(2, 5),
    checkinrating: random(2, 5),
    accuracy: random(2, 5),
    location: random(2, 5),
    value: random(2, 5),
    // zip_code: faker.address.zipCode(),
    // bedrooms: random(1, 6),
  };

  const header = Object.keys(line);
  return { line, header };
};

const createReviewScores = () => {
  const line = {
    id: 0,
    cleanliness_avg: random(2, 5),
    communication_avg: random(2, 5),
    checkinrating_avg: random(2, 5),
    accuracy_avg: random(2, 5),
    location_avg: random(2, 5),
    value_avg: random(2, 5),
    overall_avg: random(2, 5),
  };

  const header = Object.keys(line);
  return { line, header };
};

// Create 52 million reviews
generator('/Volumes/sdc/cassandra/review_text.csv', 50000000, createReviewText, 'reviews text');
// generator('/Volumes/sdc/cassandra_split/review_scores.csv', 5000000, createReviewScores, 'review scores');
