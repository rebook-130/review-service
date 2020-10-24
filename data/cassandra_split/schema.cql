-- DROP KEYSPACE IF EXISTS reviews;

-- CREATE KEYSPACE reviews WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE reviews;

-- CREATE TABLE reviews.reviews_by_listing
-- (
--   id int,
--   listing_id int,
--   user_first_name text,
--   user_avatar text,
--   review_text text,
--   time_stamp text,
--   time_formatted text,

--   cleanliness tinyint,
--   communication tinyint,
--   checkinrating tinyint,
--   accuracy tinyint,
--   location tinyint,
--   value tinyint,

--   -- zip_code text,
--   -- bedrooms tinyint,

--   PRIMARY KEY((listing_id), time_stamp))
--   WITH comment='Reviews text by listing' AND CLUSTERING ORDER BY (time_stamp DESC);

CREATE TABLE reviews.scores_by_listing
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


-- COPY reviews_by_listing (id,user_first_name,user_avatar,review_text,time_stamp,time_formatted,cleanliness,communication,checkinrating,accuracy,location,value,zip_code,bedrooms,listing_id) FROM '/Volumes/sdc/cassandra/reviews.csv' with header=false and delimiter =',';

COPY scores_by_listing FROM '/Volumes/sdc/cassandra_split/review_scores.csv' with header=false and delimiter =',';

-- CREATE INDEX idx_reviews ON reviews.reviews_by_listing(id);
