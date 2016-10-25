// Frontpage.jsx

var React = require('react');
var ReactDOM = require('react-dom');

var Feed = require('./modules/Feed.jsx');
var LogIn = require('./modules/LogIn.jsx');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <h1>App</h1>
        {this.props.children}
      </div>
    );
  }
});
var One = React.createClass({
  render: function() {
    return (
      <p>One</p>
    );
  }
});
var Two = React.createClass({
  render: function() {
    return (
      <p>two</p>
    );
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={One} />
      <Route path="/login" component={Two} />
    </Route>
  </Router>
), document.getElementById('content'));
