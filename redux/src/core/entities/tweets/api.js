// communication with the API
import { fetch } from "redux-auth-patch";


export const tweetApi = {

  // get the main feed
  getFeed: () => {
    return new fetch("http://35.165.106.221/api/v1/feed")
      .then(resp => resp.json())
      .then(json =>
        {
          let posts = json.posts
          let users = []

          for (let index in posts) {
            users.push(posts[index].user)
          }

          let obj = {
            posts: posts,
            users: users
          }

          return obj
        }
      )
  }
}

/*let getSearch = (terms) {
  fetch("/api/v1/search"), {
    body: JSON.stringify({
  		terms
  	})
  }.then(resp => {
    alert(resp);
  });
}*/
