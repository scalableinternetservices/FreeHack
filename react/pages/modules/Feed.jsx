// Feed.jsx

var React = require('react');

var Transition = require('react-router').Transition;
var Auth = require('j-toker');

var Feed = React.createClass({
  getInitialState: function() {
    return {
      name: ""
    };
  },
  componentDidMount: function() {
    // check user logged in
    console.log('got feed page');
    Auth.validateToken()
      .then(function(user) {
        this.setState({
          name: user.name
        });
      }.bind(this))
      .fail(function() {
        Transition.redirect('/login');
      });
  },
  render: function() {
    return (
      <div className="feed">
        <h2>Feed</h2>
        <p>Content for {this.state.name}</p>
      </div>
    );
  }
});

module.exports = Feed;
