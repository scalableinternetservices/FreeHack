import React from 'react';
import EmojiOne from 'emojione'
import { Card, Affix } from 'antd';
import { Button } from 'antd';

import '../../styles/profile-box.css'

function generateEmojiOne(value, type) {
  let html = ''

  if (value) {
    html = EmojiOne.toImage(value)
  } else if (type === 'profilepic') {
    html = 'You need a cute emoji for your profile!'
  } else if (type === 'nickname') {
    html = 'Set a handle bro.'
  } else if (type === 'bio') {
    html = 'Tell the world about yourself (optionally with emojis)'
  }

  if (type === 'nickname') {
    html = '@' + html
  }

  return { __html: html };
}

const ProfileBox = ({ attributes, onProfile, isMine }) => {
  return (
    <div style={{marginTop: '125px'}}>
      <Affix offsetTop={75}>
        {
          (Object.keys(attributes).length != 0) ?
            <Card>
              <div className='profile-emoji'>
                <div dangerouslySetInnerHTML={generateEmojiOne(attributes.picture, 'profilepic')} />
              </div>
              <div className='profile-info'>
                <h2>{ attributes.name }</h2>
                <div dangerouslySetInnerHTML={generateEmojiOne(attributes.nickname, 'nickname')} />
                <div dangerouslySetInnerHTML={generateEmojiOne(attributes.bio, 'bio')} />
              </div>
            </Card>
          : <div style={{ width: '90%' }}>
              <h3>Hey you! Don't you want to sign up for tweetmoji?</h3>
              <br />
              <Button>Sign In</Button>
              <br />
              <br />
              <Button type="primary">Sign Up</Button>
            </div>
        }
      </Affix>
    </div>
  );
};

export default ProfileBox
