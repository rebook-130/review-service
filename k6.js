import {
  check, group, sleep, fail,
} from 'k6';
import { Rate } from 'k6/metrics';
import http from 'k6/http';

// let's collect all errors in one metric
//const errorRate1 = new Rate('error_rate');
//const errorRate2 = new Rate('error_rate');
const errorRate3 = new Rate('error_rate');

// See https://k6.io/docs/using-k6/options
export const options = {
  thresholds: {
    error_rate: ['rate < 0.1'],
    http_req_duration: ['p(95)<100'], // 99% of requests must complete below 1.5s
  },
  stages: [
    { duration: '5s', target: 1500 }, // below normal load
    { duration: '20s', target: 1500 },
    // { duration: '30s', target: 1000 }, // normal load
    // { duration: '1m', target: 500 },
    // { duration: '30s', target: 200 }, // scale down. Recovery stage.,
  ],
  ext: {
    loadimpact: {
      distribution: {
        Dublin: { loadZone: 'amazon:ie:dublin', percent: 100 },
      },
    },
  },
};

export default function () {
  const randNum = Math.ceil(Math.random() * 5000000);
  //const resReviews = http.get(`http://localhost:3003/api/listing/${randNum}/reviews`);
  //const resScores = http.get(`http://localhost:3003/api/listing/${randNum}/scores`);
  const resHello = http.get(`http://localhost:3003/api/sayhello/`)
  //errorRate1.add(resReviews.status >= 400);
  //errorRate2.add(resScores.status >= 400);
  errorRate3.add(resHello.status >= 400);

  sleep(1);
}
