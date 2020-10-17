const faker = require('faker');
const moment = require('moment');
const Review = require('./index');

const createData = function (num) {
  // Generate Dates
  const monthYear = [];
  let now = moment();
  for (let i = 0; i < num; i += 1) {
    now = now.subtract(3, 'days');
    const dateStr = now.format('MMMM YYYY');
    const dateNum = now.unix();

    monthYear.push({
      dateNum,
      dateStr,
    });
  }

  // Generate Sex
  const sexes = ['female', 'male'];

  // Generate Reviews
  const reviews = [
    faker.lorem.words(),
    faker.lorem.sentence(),
    faker.lorem.sentences(),
    faker.lorem.paragraph(),
    faker.lorem.paragraphs(),
  ];

  for (let i = 0; i < num; i++) {
    const sex = sexes[Math.floor(Math.random() * 2)];
    const username = faker.name.firstName(sex);
    const image = `https://bookable-hrsf130-photos.s3.us-east-2.amazonaws.com/${sex}-${
      Math.floor(Math.random() * 50) + 1
    }.jpg`;
    const data = {
      username,
      image,
      dateNum: monthYear[i].dateNum,
      dateStr: monthYear[i].dateStr,
      review: reviews[Math.floor(Math.random() * 5)],
      roomId: Math.floor(Math.random() * 5) + 1,
      cleanlinessRating: Math.floor(Math.random() * 2) + 4,
      communicationRating: Math.floor(Math.random() * 2) + 4,
      checkInRating: Math.floor(Math.random() * 2) + 4,
      accuracyRating: Math.floor(Math.random() * 2) + 4,
      locationRating: Math.floor(Math.random() * 2) + 4,
      valueRating: Math.floor(Math.random() * 2) + 4,
    };
    data.totalRating =
      (data.cleanlinessRating +
        data.communicationRating +
        data.checkInRating +
        data.accuracyRating +
        data.locationRating +
        data.valueRating) /
      6;
    const review = new Review(data);
    review.save((err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
      }
    });
  }
};

createData(50);
