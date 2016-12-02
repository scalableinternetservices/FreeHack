import React from 'react';
import { Row, Col } from 'antd'
import Tweet from '../tweet'

const TweetFeed = ({ tweets, toggleReaction }) => {

  let rendertweets = tweets.map((item) =>
    <Row>
      <Tweet
        tweet={ item }
        toggleLike={(polarity) => toggleReaction(item.id, 'like', polarity)}
        toggleWow={(polarity) => toggleReaction(item.id, 'wow', polarity)}
      />
    </Row>
  )

  console.log(rendertweets)

  return (
    <Row style={{marginTop: '15px'}}>
      { rendertweets }
    </Row>
  );
};

export default TweetFeed
