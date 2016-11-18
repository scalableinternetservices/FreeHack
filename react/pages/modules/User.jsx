// User.jsx
// Profile page of user (logged in or not)

var React = require('react');

// Bootstrap Components
var Button = require('react-bootstrap').Button;

var urls = {
  userURL: function(userID) { return "/api/v1/users/" + userID; },
  followUserURL: function(userID) { return "/api/v1/users/" + userID + "/follow"; }
};

var User = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },
  componentDidMount: function() {
    this.loadUser();
  },
  toggleFollow: function() {
    var url = urls.followUserURL(this.props.params.userID);
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: {type: this.state.user && this.state.user.following === "true" ? "unfollow" : "follow"},
      success: function(response) {
        this.setState({user: response.user});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }
    });
  },
  loadUser: function() {
    var url = urls.userURL(this.props.params.userID);
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(response) {
        this.setState({user: response.user});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }
    });
  },
  render: function() {
    return (
      <div className="user">
        <h2>{this.state.user && this.state.user.name}</h2>
        <Button onClick={this.toggleFollow}>
        {this.state.user && this.state.user.following === "true" ? "Unfollow" : "Follow"}
        </Button>
      </div>
    );
  }
});

module.exports = User;
