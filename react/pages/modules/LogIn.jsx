//  Log in page for user authentication

var React = require('react');

// Bootstrap Components
var Button = require('react-bootstrap').Button;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var FormControl = require('react-bootstrap').FormControl;
var Alert = require('react-bootstrap').Alert;

var browserHistory = require('react-router').browserHistory;
var Auth = require('j-toker');
var PubSub = require('../../node_modules/j-toker/node_modules/pubsub-js');

var registerState = "register";
var loginState = "login";

var LogInPage = React.createClass({
  getInitialState: function() {
    return {
      authState: registerState,
      loading: false,
      errors: ""
    };
  },
  toggleAuthState: function() {
    if (this.state.authState == registerState) {
      this.setState({authState: loginState});
    } else {
      this.setState({authState: registerState});
    }
  },
  registerUser: function(email, password1, password2) {
    this.setState({loading: true, errors: ""});
    Auth.emailSignUp({
      email: email,
      password: password1,
      password_confirmation: password2
    }).then(function(resp) {
        this.setState({loading: false});
        browserHistory.push('/');
      }.bind(this))
      .fail(function(resp) {
        this.setState({loading: false, errors: resp.data.errors.full_messages.join(", \n")});
      }.bind(this));
  },
  logInUser: function(email, password) {
    this.setState({loading: true, errors: ""});
    Auth.emailSignIn({
      email: email,
      password: password
    }).then(function(resp) {
        this.setState({loading: false});
        browserHistory.push('/');
        PubSub.publish( 'auth', 'user registered' );
      }.bind(this))
      .fail(function(resp) {
        this.setState({loading: false, errors: resp.data.errors.join("\n")});
      }.bind(this));
  },
  render: function() {
    return (
      <div className="logInPage">
        { this.state.errors.length > 0 ? 
          <Alert bsStyle="danger">
            <h4>Error</h4>
            <p>{this.state.errors}</p>
          </Alert>
          :
          null
        }
        { this.state.authState == registerState ?
          <Register registerUser={this.registerUser} loading={this.state.loading} />
          :
          <LogIn logInUser={this.logInUser} loading={this.state.loading} />
        }
        <br />
        <br />
        <a onClick={this.toggleAuthState} >
          { this.state.authState == registerState ?
            "Log In"
            :
            "Register"
          }
        </a>
      </div>
    );
  }
});

var Register = React.createClass({
  getInitialState: function() {
    return {
      emailValue: '',
      passwordValue: '',
      passwordConfirmationValue: ''
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.registerUser(this.state.emailValue, this.state.passwordValue, this.state.passwordConfirmationValue);
  },
  handleEmailChange: function(e) {
    this.setState({emailValue: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({passwordValue: e.target.value});
  },
  handlePasswordConfirmationChange: function(e) {
    this.setState({passwordConfirmationValue: e.target.value});
  },
  render: function() {
    return (
      <div className="register">
        <h2>Register</h2>
        <br />
        <form className="form-horizontal" onSubmit={this.handleSubmit} style={{textAlign: "left"}}>
        
          <FormGroup
            controlId="formBasicText">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="text"
              value={this.state.emailValue}
              placeholder="Enter Email"
              onChange={this.handleEmailChange} />
          </FormGroup>
          
          <FormGroup
            controlId="formBasicText">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="text"
              value={this.state.passwordValue}
              placeholder="Enter Password"
              onChange={this.handlePasswordChange} />
          </FormGroup>
          
          <FormGroup
            controlId="formBasicText">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              type="text"
              value={this.state.passwordConfirmationValue}
              placeholder="Enter Password Again"
              onChange={this.handlePasswordConfirmationChange} />
          </FormGroup>

        <Button type="submit" disabled={this.props.loading}>
          Submit
        </Button>
        </form>
      </div>
    );
  }
});

var LogIn = React.createClass({
  getInitialState: function() {
    return {
      emailValue: '',
      passwordValue: ''
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.logInUser(this.state.emailValue, this.state.passwordValue);
  },
  handleEmailChange: function(e) {
    this.setState({emailValue: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({passwordValue: e.target.value});
  },
  render: function() {
    return (
      <div className="logIn">
        <h2>Log In</h2>
        <br />
        <form className="form-horizontal" onSubmit={this.handleSubmit} style={{textAlign: "left"}}>
        
          <FormGroup
            controlId="formBasicText">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="text"
              value={this.state.emailValue}
              placeholder="Enter Email"
              onChange={this.handleEmailChange} />
          </FormGroup>
          
          <FormGroup
            controlId="formBasicText">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="text"
              value={this.state.passwordValue}
              placeholder="Enter Password"
              onChange={this.handlePasswordChange} />
          </FormGroup>
          
        <Button type="submit" disabled={this.props.loading}>
          Submit
        </Button>
        </form>
      </div>
    );
  }
});

module.exports = LogInPage;
