DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews;

CREATE TABLE hosts
(
  host_id SERIAL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  superhost BOOLEAN,
  responserate SMALLINT NOT NULL,
);

CREATE TABLE users
(
  user_id SERIAL PRIMARY KEY,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  rating NUMERIC(2,1),
  avatar_url TEXT,
);

CREATE TABLE listings
(
  listing_id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  bedrooms SMALLINT NOT NULL,
  bathrooms SMALLINT NOT NULL,
  beds SMALLINT NOT NULL,
  maxguests SMALLINT NOT NULL,
  variableprice BOOLEAN NOT NULL,
  plus BOOLEAN NOT NULL,
  cancellation_policy VARCHAR(100) NOT NULL,
  lowest_price NUMERIC(7,2),
  host_id INTEGER NOT NULL,

  FOREIGN KEY (host_id) REFERENCES host(host_id)
);

CREATE TABLE reviews
(
  review_id SERIAL PRIMARY KEY,
  review_text TEXT NOT NULL,
  time_stamp TIMESTAMPZ NOT NULL,

  cleanliness NUMERIC(2,1) NOT NULL,
  communication NUMERIC(2,1) NOT NULL,
  checkinrating NUMERIC(2,1) NOT NULL,
  accuracy NUMERIC(2,1) NOT NULL,
  location NUMERIC(2,1) NOT NULL,
  value NUMERIC(2,1) NOT NULL,

  listing_id INTEGER NOT NULL,
  [CONSTRAINT fk_listings]
    FOREIGN KEY (listing_id)
  REFERENCES listings(listing_id)
  [ON DELETE CASCADE]

  user_id INTEGER NOT NULL,
  [CONSTRAINT fk_users]
    FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    [ON DELETE CASCADE]
);