/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const bodyparser = require('body-parser');
const router = require('./router');

const app = express();

//app.use(express.static(`${__dirname}/../client/dist`));

// router.get('/listing*', (req, res) => {
//   // res.setHeader('content-type', 'text/html');
//   res.sendFile(path.resolve(`${__dirname}/../client/dist/index.html`));
// });

app.use(bodyparser.json());

const port = 3003;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.use('/api', router);

// app.post('/api/rooms/:roomId/reviews', (req, res) => {
//   const newReview = req.body;
//   console.log(newReview);
//   Review.create({
//     roomId: req.params.roomId,
//     ...newReview,
//   })
//     .then((data) => { res.json(data); })
//     .catch((err) => console.error(err));
// });

// app.patch('/api/reviews/:reviewId', (req, res) => {
//   const updatedReview = req.body;
//   Review.findByIdAndUpdate(
//     req.params.reviewId,
//     { ...updatedReview },
//     { new: true },
//   )
//     .then((data) => { res.json(data); })
//     .catch((err) => console.error(err));
// });

// app.delete('/api/reviews/:reviewId', (req, res) => {
//   Review.findByIdAndDelete(
//     req.params.reviewId,
//   )
//     .then(() => res.send(`Review with _id: ${req.params.reviewId} deleted`))
//     .catch((err) => console.error(err));
// });
