/* eslint-disable no-console */
const csvWriter = require('csv-write-stream');
const faker = require('faker');
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

for (let j = 1; j <= 2; j += 1) {
  writer.pipe(fs.createWriteStream(`data/hosts_${j}.csv`));
  for (let i = 1; i <= 1000000; i += 1) {
    const createHost = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      superhost: Math.random() > 0.5,
      responserate: Math.ceil((Math.random() * (100 - 95)) + 95),
    };
    if (i % 100000 === 0) {
      console.log(`${i + ((j - 1) * 2000000)} hosts created`);
    }
    writer.write(createHost);
  }
}

writer.end();
