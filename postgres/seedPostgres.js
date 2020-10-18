/* eslint-disable no-console */
const csvWriter = require('csv-write-stream');
const fs = require('fs');
const faker = require('faker');
const {
  createTitle, cancellation, paragraphs, dates,
} = require('./seedHelpers');
const seedListings = require('./seedListings');
const seedHosts = require('./seedHosts');
const seedUsers = require('./seedUsers');
const seedReviews = require('./seedReviews');

seedListings;
seedHosts;
seedUsers;
seedReviews;