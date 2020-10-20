/* eslint-disable no-console */
const faker = require('faker');
const generator = require('./generator');

const createHost = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const superhost = Math.random() > 0.5;
  const responseRate = Math.ceil((Math.random() * (100 - 95)) + 95);

  const line = `${firstName},${lastName},${superhost},${responseRate}\n`;

  return line;
};

// Create 2 million hosts
generator('data/hosts.csv', '2000000', createHost, 'hosts');
