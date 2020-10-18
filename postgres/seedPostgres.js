/* eslint-disable no-console */
const csvWriter = require('csv-write-stream');
const fs = require('fs');
const { createTitle, cancellation } = require('./seedHelpers');

const csvoptions = {
  separator: ',',
  newline: '\n',
  sendHeaders: false,
};

const writer = csvWriter(csvoptions);

// delete a file
try {
  fs.unlinkSync('data/listings.csv');
  console.log('File is deleted.');
} catch (error) {
  console.log(error);
} finally {
  writer.pipe(fs.createWriteStream('data/listings.csv'));

  for (let i = 0; i < 1000; i += 1) {
    const bedrooms = Math.floor((Math.random() * 6) + 1);
    const createListing = {
      title: createTitle(),
      description: 'Lorem',
      bedrooms,
      bathrooms: Math.floor((Math.random() * bedrooms) + bedrooms),
      beds: Math.floor((Math.random() * bedrooms) + bedrooms),
      maxguests: Math.floor(bedrooms * 1.2),
      variablePrice: Math.random() < 0.5,
      plus: Math.random() > 0.5,
      cancellation_policy: cancellation(),
      lowest_price: Math.floor((Math.random() * 1000) + 75),
      host_id: Math.floor((Math.random() * 5000000) + 1),
    };
    writer.write(createListing);
  }

  // for (let i = 1000000; i < 2000000; i += 1) {
  //   const object = { listing_id: i, title: Math.random() };
  //   writer.write(object);
  // }

  // for (let i = 2000000; i < 3000000; i += 1) {
  //   const object = { listing_id: i, title: Math.random() };
  //   writer.write(object);
  // }

  // for (let i = 3000000; i < 4000000; i += 1) {
  //   const object = { listing_id: i, title: Math.random() };
  //   writer.write(object);
  // }

  writer.end();
}
