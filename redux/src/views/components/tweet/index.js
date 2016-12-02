import React from 'react';
import { Card, Timeline, Badge, Button } from 'antd';
/*import { emojify } from 'react-emojione';*/
import EmojiOne from 'emojione'

import '../../styles/tweet.css'

/*const options = {
    convertShortnames: true,
    convertUnicode: true,
    convertAscii: true,
    styles: {
        backgroundImage: 'url(/emojione.sprites.png)',
        width: '32px',
        height: '32px',
        margin: '4px'
    }
};*/

function generateEmojiOne(value) {
  let html = EmojiOne.toImage(value)
  return { __html: html };
}

const Tweet = ({ tweet, toggleLike, toggleWow }) => {
  let authLiked = tweet.get('liked')
  let likePolarity = ''
  let authWowed = tweet.get('wowed')
  let wowPolarity = ''
  let likedStyles = {}
  let wowedStyles = {}

  if (authLiked === 'true')
  {
    likedStyles = { borderColor: '#FF0000' }
    likePolarity = 'false'
  } else {
    likePolarity = 'true'
  }

  if (authWowed === 'true')
  {
    wowedStyles = { borderColor: '#87d068' }
    wowPolarity = 'false'
  } else {
    wowPolarity = 'true'
  }

  return (
    <Card className='tweet'>
      <div style={{ textAlign: 'center', margin: '10px auto', display: 'block' }} dangerouslySetInnerHTML={generateEmojiOne(tweet.content)} />
      <div className='originator-info'>
        <h2>@{ tweet.user.get('name') }</h2>
      </div>
      <div className="counts">
        {
          (tweet.like_count > 0) ?
            <span>
              <Badge className="likes" count={tweet.like_count} style={{ backgroundColor: '#FF0000' }} />
              - Likes
            </span>
            : ''
        }
        &nbsp;&nbsp;&nbsp;
        {
          (tweet.wow_count > 0) ?
            <span>
              <Badge className="wows" count={tweet.wow_count} style={{ backgroundColor: '#87d068' }} />
              - Wows
            </span>
            : ''
        }
      </div>
      <br />
      { /*
      <Timeline pending={ <a>See replies</a> }>
        <Timeline.Item>
        </Timeline.Item>
        <Timeline.Item>
        </Timeline.Item>
      </Timeline> */ }
      <div className="actions">
        { /*<Button className="reply" type="ghost">Reply</Button> */ }
        <Button onClick={() => toggleLike(likePolarity)} style={likedStyles} className="like" type="ghost">
          { (authLiked === 'true') ? 'Liked' : 'Like' }
        </Button>
        <Button onClick={() => toggleWow(wowPolarity)} style={wowedStyles} className="wow" type="ghost">
          { (authWowed === 'true') ? 'Wowed' : 'Wow' }
        </Button>
      </div>
    </Card>
  );
};

export default Tweet
