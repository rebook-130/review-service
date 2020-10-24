const { LoremIpsum } = require('lorem-ipsum');
const dayjs = require('dayjs');

function createTitle() {
  const adjective = ['Charming', 'Cozy', 'Elegant', 'Chic', 'Eco', 'Stunning', 'Gorgeous', 'Boutique', 'Adorable', 'Dog-Friendly', 'Beautiful', 'Private', 'Fabulous', 'Spacious', 'Comfortable', 'Relaxing', 'Rustic', 'Zen'];

  const noun = ['House', 'Cottage', 'Castle', 'Estate', 'Treehouse', 'Yurt', 'Tent', 'Bungalow', 'Cabin', 'Room', 'Architectural Wonder', 'Suite', 'Retreat', 'Suite', 'Apartment', 'Refuge', 'Villa'];

  const location = ['in the Woods', 'in the Redwoods', 'in the Mountains', 'near the Mountains', 'on the Beach', 'by the Ocean', 'in the City Center', 'Near All the Landmarks', 'By the Sea', 'on the Moors', 'in the Desert', 'in the Jungle'];

  // for (let i = 0; i < 100; i += 1) {
  const randomAdjective = Math.floor(Math.random() * adjective.length);
  const randomNoun = Math.floor(Math.random() * noun.length);
  const randomLocation = Math.floor(Math.random() * location.length);

  return `${adjective[randomAdjective]} ${noun[randomNoun]} ${location[randomLocation]}`;
  // }
}

function cancellation() {
  const random = Math.floor(Math.random() * 6 + 1);

  let policy = '';

  if (random === 1) {
    policy = 'flexible';
  } else if (random === 2) {
    policy = 'moderate';
  } else if (random === 3) {
    policy = 'strict';
  } else if (random === 4) {
    policy = 'longterm';
  } else if (random === 5) {
    policy = 'super30';
  } else if (random === 6) {
    policy = 'super60';
  }

  return policy;
}

function paragraphs() {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 6,
      min: 2,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });

  return lorem.generateParagraphs(1);
}

function dates() {
  const earliest = 1451606400;
  const current = Math.ceil(Date.now() / 1000);
  const randomEpoch = Math.ceil(((Math.random() * (current - earliest)) + earliest));

  let date = new Date(0);
  date = new Date(date.setUTCSeconds(randomEpoch)).toUTCString();
  const dateFormat = dayjs(date).format('MMMM YYYY');

  return { epoch: randomEpoch, dateFormat };
}

module.exports = {
  createTitle, cancellation, paragraphs, dates,
};
