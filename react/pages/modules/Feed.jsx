// Feed.jsx

var React = require('react');

// Bootstrap Components
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

// Custom Components
var PostList = require('./components/PostList.jsx');

// Data
var Auth = require('j-toker');
var PubSub = require('../../node_modules/j-toker/node_modules/pubsub-js');
var browserHistory = require('react-router').browserHistory;

var urls = {
  feed: "/api/v1/feed",
  feedAfter: function(lastPostId) { return "/api/v1/feed/after/" + lastPostId; }
};

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
    .then(function() {
      this.reloadData();
    }.bind(this))
    .fail(function() {
      browserHistory.push('/login');
    });
  },
  reloadData: function() {
    this.refs.list.reloadData();
  },
  render: function() {
    return (
      <div className="feed">
        <Row>
          <Col xs={8}>
            <h2>Feed</h2>
            <PostList listURL={urls.feed} ref="list" />
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
