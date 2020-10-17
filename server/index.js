/* eslint-disable no-console */
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

app.get('/api/rooms/:roomId/reviews', (req, res) => {
  Review.find({
    roomId: req.params.roomId,
  })
    .sort({ dateNum: -1 })
    .then((data) => {
      res.json(data);
    });
});

app.post('/api/rooms/:roomId/reviews', (req, res) => {
  const newReview = req.body;
  console.log(newReview);
  Review.create({
    roomId: req.params.roomId,
    ...newReview,
  })
    .then((data) => { res.json(data); })
    .catch((err) => console.error(err));
});

app.patch('/api/reviews/:reviewId', (req, res) => {
  const updatedReview = req.body;
  Review.findByIdAndUpdate(
    req.params.reviewId,
    { ...updatedReview },
    { new: true },
  )
    .then((data) => { res.json(data); })
    .catch((err) => console.error(err));
});

app.delete('/api/reviews/:reviewId', (req, res) => {
  Review.findByIdAndDelete(
    req.params.reviewId,
  )
    .then(() => res.send(`Review with _id: ${req.params.reviewId} deleted`))
    .catch((err) => console.error(err));
});
