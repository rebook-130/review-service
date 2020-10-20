/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-console */
const faker = require('faker');
const generator = require('./generator');

const createUser = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const rating = Math.ceil((Math.random() * (100 - 95)) + 95);
  const avatar_url = faker.internet.avatar();

  const line = `${firstName},${lastName},${rating},${avatar_url}\n`;

  return line;
};

// Create 3 million users
generator('data/users.csv', '3000000', createUser, 'users');
