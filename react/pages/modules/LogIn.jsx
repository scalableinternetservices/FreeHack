//  Log in page for user authentication

var React = require('react');

// Bootstrap Components
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var FormControl = require('react-bootstrap').FormControl;
var Alert = require('react-bootstrap').Alert;

var browserHistory = require('react-router').browserHistory;
var Auth = require('j-toker');

var registerState = "register";
var loginState = "login";
var registerURL = "/auth/";

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
    var params = {
      email: email,
      password: password1,
      password_confirmation: password2
    };
    $.ajax({
      url: registerURL,
      dataType: 'json',
      method: 'post',
      data: params,
      cache: false,
      success: function(data) {
        this.setState({loading: false});
        if (data["status"] === "success") {
          window.open("/frontpage");
        }
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({loading: false});
        var json = $.parseJSON(xhr.responseText);
        if (json["errors"] !== null && json["errors"]["full_messages"] !== null) {
          var fullMessages = json["errors"]["full_messages"];
          var errors = "";
          for (var message in fullMessages) {
            errors += fullMessages[message] + "\n";
          }
          this.setState({errors: errors});
        }
      }.bind(this)
    });
  },
  logInUser: function(email, password) {
    this.setState({loading: true, errors: ""});
    Auth.emailSignIn({
      email: email,
      password: password
    }).then(function(resp) {
        this.setState({loading: false});
        browserHistory.push('/');
      }.bind(this))
      .fail(function(resp) {
        this.setState({loading: false, errors: resp.data.errors.join('\n')});
      }.bind(this));
  },
  render: function() {
    return (
      <div className="logInPage">
        <Grid>
          <Row>
            <Col xs={12} md={6} mdPush={3}>
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
            </Col>
          </Row>
        </Grid>
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
    if (this.emailSatisfied(this.state.emailValue) == "success"
      && this.passwordSatisfied(this.state.passwordValue) == "success"
      && this.passwordConfirmationSatisfied((this.state.passwordConfirmationValue)) == "success") {
      this.props.registerUser(this.state.emailValue, this.state.passwordValue, this.state.passwordConfirmationValue);
    }
  },
  handleEmailChange: function(e) {
    this.setState({emailValue: e.target.value});
  },
  emailSatisfied: function(value) {
    if (value.length > 5) {
      return "success";
    } else {
      return "error";
    }
  },
  handlePasswordChange: function(e) {
    this.setState({passwordValue: e.target.value});
  },
  passwordSatisfied: function(value) {
    if (value.length > 5) {
      return "success";
    } else {
      return "error";
    }
  },
  handlePasswordConfirmationChange: function(e) {
    this.setState({passwordConfirmationValue: e.target.value});
  },
  passwordConfirmationSatisfied: function(value) {
    if (value == this.state.passwordValue) {
      return "success";
    } else {
      return "error";
    }
  },
  render: function() {
    return (
      <div className="register">
        <h2>Register</h2>
        <br />
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
        
          <FormGroup
            controlId="formBasicText"
            validationState={this.emailSatisfied(this.state.emailValue)} >
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="text"
              value={this.state.emailValue}
              placeholder="Enter Email"
              onChange={this.handleEmailChange} />
            { this.state.emailValue.length > 0 ?
              <FormControl.Feedback />
              :
              null
            }
          </FormGroup>
          
          <FormGroup
            controlId="formBasicText"
            validationState={this.passwordSatisfied(this.state.passwordValue)} >
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="text"
              value={this.state.passwordValue}
              placeholder="Enter Password"
              onChange={this.handlePasswordChange} />
            { this.state.passwordValue.length > 0 ?
              <FormControl.Feedback />
              :
              null
            }
          </FormGroup>
          
          <FormGroup
            controlId="formBasicText"
            validationState={this.passwordConfirmationSatisfied(this.state.passwordConfirmationValue)} >
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              type="text"
              value={this.state.passwordConfirmationValue}
              placeholder="Enter Password Again"
              onChange={this.handlePasswordConfirmationChange} />
            { this.state.passwordConfirmationValue.length > 0 ?
              <FormControl.Feedback />
              :
              null
            }
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
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
        
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
