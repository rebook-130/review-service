DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  rating NUMERIC(4,1),
  avatar_url TEXT);

CREATE TABLE listings(
  listing_id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  descrip TEXT NOT NULL,
  bedrooms SMALLINT NOT NULL,
  bathrooms SMALLINT NOT NULL,
  beds SMALLINT NOT NULL,
  maxguests SMALLINT NOT NULL,
  variableprice BOOLEAN NOT NULL,
  plus BOOLEAN NOT NULL,
  cancellation_policy VARCHAR(100) NOT NULL,
  lowest_price NUMERIC(7,2)
  );

DROP TABLE reviews;
CREATE TABLE reviews(
  review_id SERIAL PRIMARY KEY,
  review_text TEXT NOT NULL,
  time_stamp TEXT NOT NULL,
  time_formatted TEXT NOT NULL,

  cleanliness SMALLINT NOT NULL,
  communication SMALLINT NOT NULL,
  checkinrating SMALLINT NOT NULL,
  accuracy SMALLINT NOT NULL,
  location SMALLINT NOT NULL,
  value SMALLINT NOT NULL,

  listing_id INTEGER NOT NULL /*REFERENCES listings ON DELETE CASCADE*/,
  user_id INTEGER NOT NULL /*REFERENCES users ON DELETE CASCADE*/);

COPY users(first_name,last_name,rating,avatar_url)
FROM '/Volumes/sdc/postgres/users.csv'
WITH (format csv);

COPY listings(title,descrip,bedrooms,bathrooms,beds,maxguests,variableprice,plus,cancellation_policy,lowest_price)
FROM '/Volumes/sdc/postgres/listings.csv'
WITH (format csv);

COPY reviews(review_text,time_stamp,time_formatted,cleanliness,communication,checkinrating,accuracy,location,value,listing_id,user_id)
FROM '/Volumes/sdc/postgres/reviews.csv'
WITH (format csv);

