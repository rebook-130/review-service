/* eslint-disable camelcase */
/* eslint-disable no-console */
const fs = require('fs');
const generator = require('./generator');
const {
  createTitle, cancellation, paragraphs, dates,
} = require('./seedHelpers');

const createListing = () => {
  const title = createTitle();
  const description = paragraphs();
  const bedrooms = Math.floor((Math.random() * 6) + 1);
  const bathrooms = Math.floor((Math.random() * bedrooms) + bedrooms);
  const beds = Math.floor((Math.random() * bedrooms) + bedrooms);
  const maxguests = Math.floor(bedrooms * 1.2);
  const variablePrice = Math.random() < 0.5;
  const plus = Math.random() > 0.5;
  const cancellation_policy = cancellation();
  const lowest_price = Math.floor((Math.random() * (1000 - 75)) + 75);
  const host_id = Math.floor((Math.random() * 2000000) + 1);

  const line = `${title},${description},${bedrooms},${bathrooms},${beds},${maxguests},${variablePrice},${plus},${cancellation_policy},${lowest_price},${host_id}]n`;

  return line;
};

// Create 10 million listings
generator('data/listings.csv', '10000000', createListing, 'listings');
