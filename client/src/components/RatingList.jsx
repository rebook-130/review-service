import React from 'react';
import styled from 'styled-components';

//Components
import ProgressBar from './ProgressBar.jsx';

const Container = styled.div`
  display: flex;
  width: ${(props) => (props.isModal ? '300' : '1120')}px;
  max-height: ${(props) => (props.isModal ? '400' : '120')}px;
`;

const AllRows = styled.div`
  display: flex;
  font-weight: 400;
  flex-flow: column wrap;
  flex-direction: column;
  padding-top: 10px;
  height: ${(props) => (props.isModal ? '250' : '150')}px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  width: ${(props) => (props.isModal ? '340' : '500')}px;
  margin-right: ${(props) => (props.isModal ? '0' : '120')}px;
`;

const Category = styled.div`
  font-size: ${(props) => (props.isModal ? '14' : '16')}px;
  font-weight: ${(props) => (props.isModal ? '300' : '400')};
`;

const Rating = styled.div`
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const categories = [
  {
    label: 'Cleanliness',
    propName: 'avgcleanlinessRating',
  },
  {
    label: 'Communication',
    propName: 'avgcommunicationRating',
  },
  {
    label: 'Check-In',
    propName: 'avgcheckInRating',
  },
  {
    label: 'Accuracy',
    propName: 'avgaccuracyRating',
  },
  {
    label: 'Location',
    propName: 'avglocationRating',
  },
  {
    label: 'Value',
    propName: 'avgvalueRating',
  },
];

const RatingList = (props) => {
  const isModal = props.isModal;

  return (
    <Container className="review-list-entry" isModal={isModal}>
      <AllRows isModal={isModal}>
        {categories.map((category) => (
          <Row isModal={isModal}>
            <Category isModal={isModal}> {category.label} </Category>
            <Rating>
              <ProgressBar
                completed={
                  (parseFloat(props[category.propName]).toFixed(1) / 5) * 100
                }
                isModal={isModal}
              ></ProgressBar>
              {parseFloat(props[category.propName]).toFixed(1)}
            </Rating>
          </Row>
        ))}
      </AllRows>
    </Container>
  );
};

export default RatingList;
