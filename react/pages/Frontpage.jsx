// Frontpage.jsx

var React = require('react');
var ReactDOM = require('react-dom');

// Custom Components
var Feed = require('./modules/Feed.jsx');
var LogIn = require('./modules/LogIn.jsx');
var Account = require('./modules/Account.jsx');
var User = require('./modules/User.jsx');

// Bootstrap Components
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Navbar = require('react-bootstrap').Navbar;

// Routing
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;
var PubSub = require('../node_modules/j-toker/node_modules/pubsub-js');

var Auth = require('j-toker');
Auth.configure({apiUrl: ''});

var App = React.createClass({
  render: function() {
    return (
      <div className="app" style={{textAlign: "center"}}>
        <Grid>
          <FreeNavbar />
          <Row>
            <Col xs={12}>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

var FreeNavbar = React.createClass({
  getInitialState: function() {
    return {
      signedIn: Auth.user.signedIn
    };
  },
  componentWillMount: function() {
    // subscribe to user changes
    PubSub.subscribe('auth', function() {
      this.setState({signedIn: Auth.user.signedIn});
    }.bind(this));
  },
  handleSelect: function(key) {
    switch(key) {
      case 1:
        browserHistory.push('/');
        break;
      case 2:
        browserHistory.push('/profile');
        break;
      case 4:
        // sign out
        Auth.signOut();
        browserHistory.push('/login');
        break;
    }
  },
  render: function() {
    return (
      <div className="freeNavbar">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={function() {this.handleSelect(1);}.bind(this)}>Feed</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav bsStyle="pills" onSelect={this.handleSelect}>
              <NavItem disabled={!this.state.signedIn} eventKey={2}>Profile</NavItem>
            </Nav>
            <Nav pullRight bsStyle="pills" onSelect={this.handleSelect} style={{marginRight: "0"}}>
              <NavItem disabled={!this.state.signedIn} className="signout" eventKey={4}>Sign Out</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Feed} />
      <Route path="/login" component={LogIn} />
      <Route path="/profile" component={Account} />
      <Router path="/user/:userID" components={User} />
    </Route>
  </Router>
), document.getElementById('content'));
