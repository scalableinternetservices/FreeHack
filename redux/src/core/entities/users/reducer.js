import { Map, List, Record } from 'immutable';
import { tweetActions } from './actions';

// Join models handled by the users reducer
const Connection = new Record({
  follower: null,
  following: null
})

const UsersState = new Record({
  users: new Map({
    byId: new Map(),
    allIds: new List()
  }),
  connections: new Map({
    byId: new Map(),
    allIds: new List()
  }),
});

export function usersReducer(state = new UsersState(), {payload, type}) {
  return state
}
