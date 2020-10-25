import React from 'react';
import styled from 'styled-components';

// Components
import ReviewListEntry from './ReviewListEntry.jsx';

const Container = styled.div`
  display: flex;
  ${(props) => (props.isModal ? 'flex-direction: column;' : null)}
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 0px;
  @media (max-width: 1120px) {
    flex-direction: column;
  }
`;

const ReviewList = ({reviews}, props) => {
  const isModal = props.isModal ? true : false;

  console.log('isModal from review lsit: ', isModal)
  if (!isModal || isModal === undefined) {
    reviews = reviews.slice(0, 6);
  } else {
    reviews
  }

  return (
    <Container isModal={isModal}>
      {reviews.map((review, i) => (
        <ReviewListEntry
          key={review.id}
          entryIndex={i}
          review={review}
          isModal={isModal}
          search={props.search}
        />
      ))}
    </Container>
  );
};

export default ReviewList;
