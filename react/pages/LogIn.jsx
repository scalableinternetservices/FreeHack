//  Log in page for user authentication

var React = require('react');
var ReactDOM = require('react-dom');

var LogInPage = React.createClass({
  render: function() {
    return (
      <div className="logInPage">
        <h2>Log In Here</h2>
        <form>
          <input type="text" name="username" />
          <input type="text" name="password" />
        </form>
      </div>
    );
  }
})


ReactDOM.render(
  <LogInPage />,
  document.getElementById('content')
);
