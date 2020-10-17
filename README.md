# Bookable

> Project description

We built a replica of an Airbnb listing by splitting up the 4 main components: photo-gallery, calender, reviews, and more places to stay. We not only replicated the functionalities of the components, but also styled everything to be nearly identical to Airbnb's stylings.

## Related Projects

- https://github.com/Bookable-130/photo-gallery-service
- https://github.com/Bookable-130/calendar-service
- https://github.com/Bookable-130/review-service
- https://github.com/Bookable-130/more-places-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Requirements

- Node 6.13.0
- NPM 6.14.8
- MongoDB 4.2.8

## Development

### Installing Dependencies

From within the root directory:

- npm install

### Running the application

- Run MongoDB: mongod --dbpath data
- Run Webpack: npm run build:dev
- Run Express server: npm run start:dev

## Server API

### Get all reviews for a room
  * GET `/api/rooms/:roomId/reviews`

**Path Parameters:**
  * `roomId` room id

**Success Status Code:** `200`

**Returns:** JSON

```json
[
    {
        "_id": "5f87320c2f0ef0a36473b990",
        "roomId": Number,
        "username":String,
        "image":String,
        "dateNum":Number,
        "dateStr":String,
        "review":String,
        "cleanlinessRating":Number,
        "communicationRating":Number,
        "checkInRating":Number,
        "accuracyRating":Number,
        "locationRating":Number,
        "valueRating":Number,
        "totalRating":Number,
        "__v": 0
    }
]
```

### Add one review
  * POST `/api/rooms/:roomId/reviews`

**Path Parameters:**
  * `roomId` room id

**Success Status Code:** `200`

**Request Body**: Expects JSON with the following keys.

```json
    {
        "username":String,
        "image":String,
        "dateNum":Number,
        "dateStr":String,
        "review":String,
        "cleanlinessRating":Number,
        "communicationRating":Number,
        "checkInRating":Number,
        "accuracyRating":Number,
        "locationRating":Number,
        "valueRating":Number,
        "totalRating":Number,
    }
```
### Update an individial review
  * PATCH `/api/reviews/:reviewId`

**Path Parameters:**
  * `reviewId` review id

**Success Status Code:** `200`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
        "username":String,
        "image":String,
        "dateNum":Number,
        "dateStr":String,
        "review":String,
        "cleanlinessRating":Number,
        "communicationRating":Number,
        "checkInRating":Number,
        "accuracyRating":Number,
        "locationRating":Number,
        "valueRating":Number,
        "totalRating":Number,
    }
```

### Delete a review
  * DELETE `/api/reviews/:reviewId`

**Path Parameters:**
  * `reviewId` review id

**Success Status Code:** `200`