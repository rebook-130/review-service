/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-console */
const faker = require('faker');
const generator = require('../generatorCsv');

const createUser = () => {
  const line = {
    user_id: null,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    rating: (Math.random() * (100 - 95) + 95).toFixed(1),
    avatar_url: faker.internet.avatar(),
  };

  const header = Object.keys(line);
  return { line, header };
};

// Create 5 million users
generator('/Volumes/sdc/cassandra/users.csv', '2000000', createUser, 'users');
