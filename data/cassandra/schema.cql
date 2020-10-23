DROP KEYSPACE IF EXISTS reviews;

CREATE KEYSPACE reviews WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE reviews;

-- CREATE TABLE reviews.users
-- (
--   user_id INTEGER ,
--   first_name text,
--   last_name text,
--   rating decimal,
--   avatar_url text,
--   PRIMARY KEY (user_id))
--   WITH COMMENT = 'All users'

-- CREATE TABLE reviews.listings (
--   listing_id int,
--   title text,
--   descrip text,
--   type text,
--   bedrooms tinyint,
--   bathrooms tinyint,
--   beds tinyint,
--   maxguests tinyint,
--   variableprice boolean,
--   plus boolean,
--   cancellation_policy text,
--   lowest_price decimal,

--   PRIMARY KEY (listing_id)
--   WITH comment = 'All listings'
--   AND CLUSTERING ORDER BY (listing_id ASC)

CREATE TABLE reviews.reviews_by_listing
(
  id int,
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

  zip_code text,
  bedrooms tinyint,
  listing_id int,

  PRIMARY KEY((listing_id), time_stamp))
  WITH comment='Reviews by listing' AND CLUSTERING ORDER BY (time_stamp DESC);

COPY reviews_by_listing (id,user_first_name,user_avatar,review_text,time_stamp,time_formatted,cleanliness,communication,checkinrating,accuracy,location,value,zip_code,bedrooms,listing_id) FROM '/Volumes/sdc/cassandra/reviews.csv' with header=false and delimiter =',';

CREATE INDEX idx_reviews ON reviews.reviews_by_listing(id);
