// Account.jsx
// Update user account information

var React = require('react');

// Custom Components
var InputEditableTextField = require('./components/InputEditableTextField.jsx');

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
  render: function() {
    return (
      <div className="account">
        <h2>Account</h2>
        <form className="form-horizontal">
          <InputEditableTextField title="Name" placeholder="Enter name"
            buttonTitle="Submit" currentValue={this.state.user.name} onSubmit={this.updateName} />
          </form>
      </div>
    );
  }
});

module.exports = Account;
