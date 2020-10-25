import React from 'react';
// import $ from 'jquery';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';

// Components
import TopBar from './TopBar';
import RatingList from './RatingList';
import ReviewList from './ReviewList';
import Modal from './Modal';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Circular, -apple-system, system-ui, Roboto;
    color: rgb(34, 34, 34);
    position: relative;
  }
  body.modal-open {
    overflow: hidden;
  }
  input {
    font-family: Circular, -apple-system, system-ui, Roboto;
    color: rgb(34, 34, 34);
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 11%;
  margin-right: 11%;
  padding: 30px 0px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`;

const ShowAllButton = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding: 13px 23px 13px 23px;
  border-width: 1px;
  border-color: rgb(34, 34, 34);
  border-style: solid;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgb(247, 247, 247);
  }

  display: flex;
  justify-content: center;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ratingKeys = [
  'cleanlinessRating',
  'communicationRating',
  'checkInRating',
  'accuracyRating',
  'locationRating',
  'valueRating',
  'totalRating',
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      scores: [],
      reviewsDisplayed: [],
      modalVisible: false,
      numShown: 6,
    };

    this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
  }

  componentDidMount() {
    this.getAllReviews();
  }

  getAllReviews() {
    axios.get(`/api${window.location.pathname}/reviews`)
      .then((response) => {
        const { data } = response;
        this.setState({
          reviews: data,
          reviewsDisplayed: data.slice(0, this.state.numShown),
        });
      })
      .then(() => {
        axios.get(`/api${window.location.pathname}/scores`)
          .then((response) => {
            const { data } = response;
            this.setState({
              scores: data,
            });
          });
      })
      .catch((err) => console.log(err));
  }

  toggleModalVisibility() {
    this.setState((prevState) => ({
      modalVisible: !prevState.modalVisible,
    }));
  }

  render() {
    const { state } = this;
    return (
      <>
        <AppContainer>
          <GlobalStyle />

          <TopBar
            avgtotalRating={state.scores.overall_avg}
            reviewsLength={state.reviews.length}
          />

          <RatingList scores={state.scores} />

          <ReviewList
            reviewsDisplayed={state.reviewsDisplayed}
            reviews={state.reviews}
          />

          {state.reviews.length > state.numShown ? (
            <ButtonContainer>
              <ShowAllButton
                onClick={() => {
                  this.toggleModalVisibility();
                }}
              >
                Show all
                {' '}
                {state.reviews.length}
                {' '}
                reviews
              </ShowAllButton>
            </ButtonContainer>
          ) : null}
        </AppContainer>

        {state.modalVisible ? (
          <Modal
            close={() => {
              this.toggleModalVisibility();
            }}
            {...this.state}
            reviewsLength={state.reviews.length}
          />
        ) : null}
      </>
    );
  }
}

export default App;
