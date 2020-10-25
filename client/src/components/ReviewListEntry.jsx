/* eslint-disable react/prop-types */
import React from 'react';
import Highlighter from 'react-highlight-words';
import styled from 'styled-components';

// Components
import ProgressBar from './ProgressBar.jsx';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 10px 0px 20px 0px;
  width: ${(props) => (props.isModal ? '100%' : '45%')};
  @media (max-width: 1120px) {
    width: 100%;
  }

  @media (max-width: 800px) {
    ${(props) => (!props.isModal && props.isLatterEntries ? 'display: none;' : null)}
  }
`;

export const AvatarNameDateAndReview = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvatarNameAndDate = styled.div`
  display: flex;
  align-items: center;
`;

const NameAndDate = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: rgb(113, 113, 113);
`;

const AvatarContainer = styled.div`
  padding: 3px 10px 3px 3px;
`;

const Avatar = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 57px;
  height: 60px;
  border-radius: 50%;
`;

const AverageRating = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  width: 200px;
  font-weight: 600;
`;

const Review = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const ReadMore = styled.span`
  white-space: nowrap;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-decoration: underline;
  cursor: pointer;
`;

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readMoreButton: props.review.review_text.length > 180,
    };

    this.handleReadMore = this.handleReadMore.bind(this);
  }

  handleReadMore() {
    this.setState({
      readMoreButton: false,
    });
  }

  render() {
    const { isModal } = this.props;
    const { review } = this.props;

    const isLatterEntries = this.props.entryIndex > 2;

    return (
      <Container isModal={isModal} isLatterEntries={isLatterEntries}>
        <AvatarNameDateAndReview>
          <AvatarNameAndDate>
            <AvatarContainer>
              <Avatar src={review.user_avatar} />
            </AvatarContainer>

            <NameAndDate>
              <Name>{review.user_first_name}</Name>
              <Date>{review.time_formatted}</Date>
            </NameAndDate>
          </AvatarNameAndDate>

          {this.props.search ? (
            <Review>
              <Highlighter
                searchWords={[this.props.search]}
                autoEscape
                textToHighlight={review.review_text}
              />
            </Review>
          ) : null}

          {!this.props.search ? (
            <Review>
              {this.state.readMoreButton ? (
                <>
                  {`${review.review_text.substring(0, 180)}... `}
                  <ReadMore
                    onClick={() => {
                      this.handleReadMore();
                    }}
                  >
                    read more
                  </ReadMore>
                </>
              ) : (
                review.review_text
              )}
            </Review>
          ) : null}
        </AvatarNameDateAndReview>
      </Container>
    );
  }
}

export default ReviewListEntry;
