// Account.jsx
// Update user account information

var React = require('react');

// Custom Components
var InputEditableTextField = require('./components/InputEditableTextField.jsx');

// Bootstrap Components
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

// Data
var Auth = require('j-toker');
var PubSub = require('../../node_modules/j-toker/node_modules/pubsub-js');

var Account = React.createClass({
  getInitialState: function() {
    return {
      user: Auth.user
    };
  },
  componentWillMount: function() {
    // subscribe to user changes
    PubSub.subscribe('auth', function() {
      this.setState({user: Auth.user});
    }.bind(this));
  },
  updateName: function(text) {
    Auth.updateAccount({
      name: text
    });
  },
  updateNickname: function(text) {
    Auth.updateAccount({
      nickname: text
    });
  },
  updateBio: function(text) {
    Auth.updateAccount({
      bio: text
    });
  },
  render: function() {
    return (
      <div className="account" style={{textAlign: "left"}}>
        <Row>
          <Col xs={12} md={6} mdPush={3}>
            <h2>Account Details</h2>
            <InputEditableTextField title="Name" placeholder="Enter name"
              buttonTitle="Submit" currentValue={this.state.user.name} onSubmit={this.updateName} />
            <InputEditableTextField title="Nickname" placeholder="Enter nickname"
              buttonTitle="Submit" currentValue={this.state.user.nickname} onSubmit={this.updateNickname} />
            <InputEditableTextField title="Bio" placeholder="Enter bio"
              buttonTitle="Submit" currentValue={this.state.user.bio} onSubmit={this.updateBio} />
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = Account;
