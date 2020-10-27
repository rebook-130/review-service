DROP KEYSPACE IF EXISTS reviews;

CREATE KEYSPACE  IF NOT EXISTS reviews WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};

USE reviews;

CREATE TABLE IF NOT EXISTS reviews.reviews_by_listing
(
  id int,
  listing_id int,
  user_first_name text,
  user_avatar text,
  review_text text,
  time_stamp text,
  time_formatted text,

  cleanliness tinyint,
  communication tinyint,
  checkinrating tinyint,
  accuracy tinyint,
  location tinyint,
  value tinyint,

  -- zip_code text,
  -- bedrooms tinyint,

  PRIMARY KEY((listing_id), time_stamp))
  WITH comment='Reviews text by listing' AND CLUSTERING ORDER BY (time_stamp DESC);

CREATE TABLE IF NOT EXISTS reviews.scores_by_listing
(
  listing_id int,

  cleanliness_avg tinyint,
  communication_avg tinyint,
  checkinrating_avg tinyint,
  accuracy_avg tinyint,
  location_avg tinyint,
  value_avg tinyint,
  overall_avg tinyint,

  PRIMARY KEY(listing_id))
  WITH comment='Reviews scores by listing';


COPY reviews_by_listing FROM '/Volumes/sdc/cassandra/review_text.csv';

COPY scores_by_listing FROM '/Volumes/sdc/cassandra/review_scores.csv';
