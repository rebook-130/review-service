DROP KEYSPACE IF EXISTS reviews

CREATE KEYSPACE reviews WITH replication =
  {‘class’: ‘SimpleStrategy’, ‘replication_factor’ : 1};

USE reviews

CREATE TABLE reviews.listings (
  listing_id int,
  title text,
  description text,
  location text,
  type text,
  bedrooms tinyint,
  bathrooms tinyint,
  beds tinyint,
  maxguests tinyint,
  variableprice boolean,
  plus boolean,
  cancellation_policy text,
  lowest_price decimal,
  host_id int,

  PRIMARY KEY ((listing_id, location), host_id))
  WITH comment = 'All listings'
  AND CLUSTERING ORDER BY (host_id ASC)

CREATE TABLE reviews.hosts (
  host_id int,
  name text,
  superhost boolean,
  responserate smallint,
  PRIMARY KEY (host_id))
  WITH COMMENT = 'All hosts'
  AND CLUSTERING ORDER BY (host_id ASC)

CREATE TABLE reviews.users
(
  user_id INTEGER ,
  firstName text,
  lastName text,
  rating decimal,
  avatar_url text,
);

CREATE TABLE reviews.reviews_by_listing
(
  review_id int,
  listing_id int,
  user_firstName text,
  user_avatar text,
  review_text text,
  time_stamp timeuuid,

  cleanliness tinyint,
  communication tinyint,
  checkinrating tinyint,
  accuracy tinyint,
  location tinyint,
  value tinyint,

  PRIMARY KEY((review_id, listing_id), time_stamp)
  WITH comment='Reviews by listing'
  AND CLUSTERING ORDER BY (time_stamp DESC)