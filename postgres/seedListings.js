/* eslint-disable no-console */
const csvWriter = require('csv-write-stream');
const fs = require('fs');
const {
  createTitle, cancellation, paragraphs, dates,
} = require('./seedHelpers');

const csvoptions = {
  separator: ',',
  newline: '\n',
  sendHeaders: false,
};

const writer = csvWriter(csvoptions);

for (let j = 1; j <= 5; j += 1) {
  writer.pipe(fs.createWriteStream(`data/listings_${j}.csv`));
  for (let i = 1; i <= 1000000; i += 1) {
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
      lowest_price: Math.floor((Math.random() * (1000 - 75)) + 75),
      host_id: Math.floor((Math.random() * 2000000) + 1),
    };
    if (i % 100000 === 0) {
      console.log(`${i + ((j - 1) * 1000000)} listings created`);
    }
    writer.write(createListing);
  }
}

writer.end();
