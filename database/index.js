const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['3.101.121.94', '3.101.86.43', '18.144.30.155'],
  localDataCenter: 'datacenter1',
  keyspace: 'reviews',
});

module.exports = client;
