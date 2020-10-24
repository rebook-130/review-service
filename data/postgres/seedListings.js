/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const faker = require('faker');
const generator = require('../generatorCsv');
const {
  createTitle, cancellation, paragraphs, dates,
} = require('../seedHelpers');

const random = function random(min, max) { return Math.ceil(Math.random() * (max - min) + min); };

const createListing = () => {
  const bedrooms = random(1, 6);
  const line = {
    title: createTitle(),
    description: paragraphs(),
    bedrooms,
    bathrooms: Math.floor((Math.random() * bedrooms) + bedrooms),
    beds: Math.floor((Math.random() * bedrooms) + bedrooms),
    maxguests: Math.floor(bedrooms * 1.2),
    variablePrice: Math.random() < 0.5,
    plus: Math.random() > 0.5,
    cancellation_policy: cancellation(),
    lowest_price: random(75, 1000),
    zip_code: faker.address.zipCode(),
  };

  const header = Object.keys(line);
  return { line, header };
};

// Create 5 million listings
generator('/Volumes/sdc/postgres/listings.csv', '5000000', createListing, 'listings')
  .then(() => console.log('Listings done'));
