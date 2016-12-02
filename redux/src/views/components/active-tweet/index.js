import React from 'react';
import { Card, Timeline, Badge, Button, Modal, Row, Col } from 'antd';
import EmojiPicker from 'emojione-picker'
import EmojiOne from 'emojione'
import 'emojione-picker/css/picker.css'
import '../../styles/active-tweet.css'

function generateEmojiOne(value) {
  let html = EmojiOne.toImage(value)
  return { __html: html };
}

class ActiveTweet extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmojiChange = this.handleEmojiChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      content: ''
    };
  }
  handleEmojiChange(value) {
    let newContent = this.state.content + value.shortname
    this.setState({
      content: newContent
    })
  }
  handleCancel() {
    this.setState({
      content: ''
    })

    this.props.close()
  }
  render() {
    return (
      <Modal
        wrapClassName="vertical-center-modal"
        visible={ this.props.show }
        footer={''}
        onCancel={  this.handleCancel }
        title="Post a tweet yo"
      >
        <Row className="active-tweet">
          <div className="picker">
            <EmojiPicker search={ true } onChange={ this.handleEmojiChange } />
            <br />
            <h2 style={{textAlign: 'center'}}>Your Tweet:</h2>
            <div style={{ textAlign: 'center', margin: '10px auto', display: 'block' }} dangerouslySetInnerHTML={generateEmojiOne(this.state.content)} />
            <br />
            <Button onClick={ () => this.props.attemptTweet(this.state.content) } type="primary">Post</Button>
        </div>
        </Row>
      </Modal>
    );
  }
}

export default ActiveTweet
