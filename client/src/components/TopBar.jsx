/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-bottom: 20px;
`;

export const Title = styled.div`
  font-size: ${(props) => (props.isModal ? '30' : '22')}px;
  font-weight: ${(props) => (props.isModal ? '700' : '600')};
  padding-right: 5px;
`;

export const StarIcon = styled.div`
  font-size: ${(props) => (props.isModal ? '30' : '20')}px;
  color: rgb(237, 59, 90);
  padding: 3px 6px 3px 3px;
`;

const TopBar = ({ isModal, reviewsLength, avgtotalRating }) => (
  <Container>
    <StarIcon isModal={isModal}>&#9733;</StarIcon>
    <Title isModal={isModal}>
      {parseFloat(avgtotalRating).toFixed(2)}
      {' '}
      (
      {reviewsLength}
      {' '}
      reviews)
    </Title>
  </Container>
);

export default TopBar;
