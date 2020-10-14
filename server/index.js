const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const Review = require('../database/index');

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyparser.json());

const port = 3003;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.get('/rooms/*', (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.sendFile(path.resolve(`${__dirname}/../client/dist/index.html`));
});

app.get('/api/rooms/:roomId', (req, res) => {
  Review.find({
    roomId: req.params.roomId,
  })
    .sort({ dateNum: -1 })
    .then((data) => {
      res.json(data);
    });
});

app.post('/api/rooms/:roomId', (req, res) => {
  const newReview = req.body;
  console.log(newReview);
  Review.create({
    roomId: req.params.roomId,
    ...newReview,
  })
    .then((data) => { res.json(data); })
    .catch((err) => console.error(err));
});

app.patch('/api/rooms/:roomId', (req, res) => {
  const updatedReview = req.body;
  Review.create({
    roomId: req.params.roomId,
    ...updatedReview,
  })
    .then((data) => { res.json(data); })
    .catch((err) => console.error(err));
});
