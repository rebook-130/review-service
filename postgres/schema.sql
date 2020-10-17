DROP DATABASE IF EXISTS reviews

CREATE DATABASE reviews

CREATE TABLE reviews.listings
(
  listing_id PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(200) NOT NULL,
  type VARCHAR(100) NOT NULL,
  bedrooms SMALLINT NOT NULL,
  bathrooms SMALLINT NOT NULL,
  beds SMALLINT NOT NULL,
  maxguests SMALLINT NOT NULL,
  variableprice BOOLEAN NOT NULL,
  plus BOOLEAN NOT NULL,
  cancellation_policy VARCHAR(100) NOT NULL,
  lowest_price NUMERIC(7,2),
  host_id INTEGER NOT NULL,

  [CONSTRAINT fk_hosts]
    FOREIGN KEY (host_id)
    REFERENCES hosts(host_id)
  [ON DELETE CASCADE]
);

CREATE TABLE reviews.hosts
(
  host_id PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  superhost BOOLEAN,
  responserate SMALLINT NOT NULL,
);

CREATE TABLE reviews.users
(
  user_id PRIMARY KEY,
  firstName VARCHAR(150),
  lastName VARCHAR(150),
  rating NUMERIC(2,1),
);

CREATE TABLE reviews.reviews
(
  review_id PRIMARY KEY,
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