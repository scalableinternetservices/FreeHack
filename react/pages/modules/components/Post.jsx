// Post.jsx
// Post view

var React = require('react');

/**
 View component representing a post in feed
 
 @prop post: model to style from
 @prop react: callback function: (reaction) => {}
 **/
var Post = React.createClass({
  render: function() {
    return (
      <div className="post">
        <h4>{post.user.name}</h4>
        <p>{post.content}</p>
      </div>
    );
  } 
}),
