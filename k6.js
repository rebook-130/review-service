import {
  check, group, sleep, fail,
} from 'k6';
import { Rate } from 'k6/metrics';
import http from 'k6/http';

// let's collect all errors in one metric
const errorRate = new Rate('error_rate');

// See https://k6.io/docs/using-k6/options
export const options = {
  thresholds: {
    error_rate: ['rate < 0.1'],
    http_req_duration: ['p(95)<100'], // 99% of requests must complete below 1.5s
  },
  stages: [
    { duration: '30s', target: 1500 }, // below normal load
    // { duration: '1m', target: 500 },
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
  const res = http.get(`http://localhost:3003/listing/${randNum}`);

  errorRate.add(res.status >= 400);

  sleep(1);
}
