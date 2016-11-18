// Post.jsx
// Post view

var React = require('react');

var ReactEmoji = require('react-emoji');

var Button = require('react-bootstrap').Button;
var Link = require('react-router').Link;
// var Glyphicon = require('react-bootstrap').Glyphicon;

var urls = {
  "react": function(id) { return "/api/v1/posts/" + id + "/react/" }
};

/**
 View component representing a post in feed
 
 @prop post: model to style from
 @prop onChange: callback called after post is updated => ()
 **/
var Post = React.createClass({
  toggleReaction: function(reaction, action) {
    var reactURL = urls.react(this.props.post.id);
    $.ajax({
      url: reactURL,
      dataType: 'json',
      type: 'POST',
      data: {desired: action, reaction: reaction},
      success: function(response) {
        this.props.onChange(response.post);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(reactURL, status, err.toString());
      }.bind(this)
    });
  },
  toggleLike: function() {
    this.toggleReaction("like", (this.props.post.liked === "true") ? "unreact" : "react");
  },
  toggleWow: function() {
    this.toggleReaction("wow", (this.props.post.wowed === "true") ? "unreact" : "react");
  },
  render: function() {
    return (
      <div className="post">
        <h4><Link to={"/user/" + this.props.post.user.id}>{this.props.post.user.name}</Link></h4>
        <p>{ReactEmoji.emojify(this.props.post.content)}</p>
        <Button onClick={this.toggleLike}
          style={(this.props.post.liked === "true") ? {backgroundColor: "#9dc2eb"} : null}>
          {ReactEmoji.emojify(":relaxed:")}
          {this.props.post.like_count}
        </Button>
        <Button onClick={this.toggleWow}
          style={(this.props.post.wowed === "true") ? {backgroundColor: "#9dc2eb"} : null}>
          {ReactEmoji.emojify(":astonished:")}
          {this.props.post.wow_count}
        </Button>
      </div>
    );
  } 
});

module.exports = Post;
