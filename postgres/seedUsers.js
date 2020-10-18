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

for (let j = 1; j <= 3; j += 1) {
  writer.pipe(fs.createWriteStream(`data/users_${j}.csv`));
  for (let i = 1; i <= 1000000; i += 1) {
    const createUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      rating: Math.ceil((Math.random() * (100 - 95)) + 95),
      avatar_url: faker.internet.avatar(),
    };
    if (i % 100000 === 0) {
      console.log(`${i + ((j - 1) * 1000000)} users created`);
    }
    writer.write(createUser);
  }
}

writer.end();
