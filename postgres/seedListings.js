/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const generator = require('./generatorCsv');
const {
  createTitle, cancellation, paragraphs, dates,
} = require('./seedHelpers');

const createListing = () => {
  const bedrooms = Math.floor((Math.random() * 6) + 1);
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
    lowest_price: Math.floor((Math.random() * (1000 - 75)) + 75),
  };

  const header = Object.keys(line);
  return { line, header };
};

// Create 10 million listings
generator('/Volumes/sdc/postgres/listings.csv', '5000000', createListing, 'listings')
  .then(() => console.log('Listings done'));
