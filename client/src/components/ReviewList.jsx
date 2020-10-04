import React from 'react';
import styled from 'styled-components';

// Components
import ReviewListEntry from './ReviewListEntry.jsx';

const Container = styled.div`
  display: flex;
  ${(props) => (props.isModal ? 'flex-direction: column;' : null)}
  justify-content: space-between;
  flex-wrap: wrap;
  width: ${(props) => (props.isModal ? '500' : '1120')}px;
  padding: 10px 10px 10px 10px;
  @media (max-width: 1120px) {
    flex-direction: column;
  }
`;

const ReviewList = (props) => {
  const isModal = props.isModal;

  let reviews = props.reviewsDisplayed;
  if (isModal) {
    reviews = props.reviews;
  }

  return (
    <Container className="review-list" isModal={isModal}>
      {reviews.map((review, i) => (
        <ReviewListEntry
          key={i}
          review={review}
          isModal={isModal}
          search={props.search}
        />
      ))}
    </Container>
  );
};

export default ReviewList;
