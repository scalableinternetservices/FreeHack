import { OrderedMap, Map, Set, Record, List } from 'immutable';
import { Tweet } from './tweet'
import { tweetActions } from './actions';

const Tweets = new Record({
  replies: new List(),
  fetching: false,
  didInvalidate: false
});

export function tweetsReducer(state = new OrderedMap(), action) {

  let denormalizer = (entity) => {
    let modified = entity
    modified.user = new Map(entity.user)
    return modified
  }

  switch (action.type) {
    case tweetActions.POLL_TWEETS_SUCCESS:
      for (let i in action.payload.posts) {
        let modifiedPost = action.payload.posts[i]
        modifiedPost.user = new Map(action.payload.posts[i].user)
        console.log(action.payload.posts[i].id)
        state = state.set(action.payload.posts[i].id, new Tweet(modifiedPost))
      }
      return state
    case 'POST_REACTION_SUCCESS':
      state = state.set(action.payload.result.id, new Tweet(denormalizer(action.payload.result)))
      return state
    default:
      return state
  }

}
