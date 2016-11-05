// Feed.jsx

var React = require('react');

// Bootstrap Components
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

// Data
var Auth = require('j-toker');
var PubSub = require('../../node_modules/j-toker/node_modules/pubsub-js');
var browserHistory = require('react-router').browserHistory;

var Feed = React.createClass({
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
  componentDidMount: function() {
    // validate token and get user
    Auth.validateToken()
    .fail(function() {
      browserHistory.push('/login');
    });
  },
  render: function() {
    return (
      <div className="feed">
        <Row>
          <Col xs={8}>
            <h2>Feed</h2>
            <p>Content for {this.state.user && this.state.user.email}</p>
          </Col>
          <Col xs={4}>
            <div>
              <h2>Profile</h2>
              <p><b>Name:</b> {this.state.user && this.state.user.name}</p>
              <p><b>Email:</b> {this.state.user && this.state.user.email}</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = Feed;
