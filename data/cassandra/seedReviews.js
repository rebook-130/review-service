/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const faker = require('faker');
const generator = require('../generatorCsv');

const {
  createTitle, cancellation, paragraphs, dates,
} = require('../seedHelpers');

const random = function random(min, max) { return Math.ceil(Math.random() * (max - min) + min); };

const createReview = () => {
  const date = dates();
  const line = {
    id: 0,
    user_first_name: faker.name.firstName(),
    user_avatar: faker.internet.avatar(),
    review_text: paragraphs(),
    time_stamp: date.epoch,
    time_formatted: date.dateFormat,

    cleanliness: random(5, 2),
    communication: random(5, 2),
    checkinrating: random(5, 2),
    accuracy: random(5, 2),
    location: random(5, 2),
    value: random(5, 2),

    zip_code: faker.address.zipCode(),
    bedrooms: random(1, 6),
    listing_id: random(1, 10000),
  };

  const header = Object.keys(line);
  return { line, header };
};

// Create 52 million reviews
generator('/Volumes/sdc/cassandra/reviews.csv', 50000000, createReview, 'reviews');
// id, user_first_name, user_avatar, review_text, time_stamp, time_formatted, cleanliness, communication, checkinrating, accuracy, location, value, zip_code, bedrooms, listing_id