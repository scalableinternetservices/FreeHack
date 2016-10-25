// Feed.jsx

var React = require('react');

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
        <h2>Feed</h2>
        <p>Content for {this.state.user && this.state.user.email}</p>
      </div>
    );
  }
});

module.exports = Feed;
