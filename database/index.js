const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['54.219.212.199', '54.219.212.199', '54.215.28.203'],
  localDataCenter: 'datacenter1',
  keyspace: 'reviews',
});

module.exports = client;
