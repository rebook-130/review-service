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

let count = 0;
for (let j = 1; j <= 10; j += 1) {
  writer.pipe(fs.createWriteStream(`data/reviews_${j}.csv`));
  for (let i = 1; i <= 10000; i += 1) {
    const date = dates();
    const createReview = {
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

    count += 1;
    if (i % 10000 === 0) {
      console.log(`${count} reviews created`);
    }
    writer.write(createReview);
  }
}

writer.end();
