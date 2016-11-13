// PostList.jsx

var React = require('react');

// Custom Components
var Post = require('./Post.jsx');

/*
PostList: Shows list of Post views representing a collection of posts
CASE: User's frontpage feed
@param listURL: url to get list start from (/api/v1/feed)
@param listAfterURL: url to get list pages from (/api/v1/feed/after/:last_post_id)
 */
var PostList = React.createClass({
  getInitialState: function() {
    return {
      posts: []
    };
  },
  reloadData: function() {
    this.fetchPosts(true);
  },
  fetchPosts: function(reset) {
    var url = reset ? this.props.listURL : this.props.listAfterURL;
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(response) {
        if (reset) {
          this.setState({posts: response.posts})
        } else {
          this.setState(({posts: this.state.posts.concat(reponse.posts)}));
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  postChanged: function(postIndex, post) {
    var posts = this.state.posts;
    if (postIndex >= 0 && postIndex < posts.length) {
      posts[postIndex] = post;
      this.setState({posts: posts});
    }
  },
  render: function() {
    var postChanged = this.postChanged;
    var posts = this.state.posts.map(function(post, postIndex) {
      return <Post post={post} onChange={function(post){postChanged(postIndex, post);}} key={post.id}/>;
    });
    return (
      <div className="postList">
        {posts}
      </div>
    );
  }
})

module.exports = PostList;
