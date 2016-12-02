import { Set, List, Record } from 'immutable'
import { authActions } from '../auth'

const Term = new Record({
  term: null,
  termType: null
})

export const SearchBar = new Record({
  terms: new List(),
  active: false
});

const UiState = new Record({
  searchBar: new SearchBar(),
  searchResults: new Set(),
  searchBookmark: null,
  activeDraft: false,
  showAuth: false,
  tweetPostSuccess: 0
});

export default function uiReducer(state = new UiState(), {payload, type}) {
  switch (type) {
    case authActions.BOOT_AUTH:
      return state.set('showAuth', payload.type)
    case authActions.CLOSE_AUTH:
      console.log("reached")
      return state.set('showAuth', false)
    case 'NEW_SEARCH':
      return state.setIn(['searchBar', 'terms'], new List(payload.terms))
    case 'CREATE_TWEET_DRAFT':
      return state.set('activeDraft', true)
    case 'CANCEL_CREATE_TWEET':
      return state.set('activeDraft', false)
    case 'POST_TWEET_SUCCESS':
      state = state.set('tweetPostSuccess', (state.get('tweetPostSuccess') + 1))
      state = state.set('activeDraft', false)
      return state
    case 'POST_TWEET_SUCCESS_ALERT_FIRED':
      return state.set('tweetPostSuccess', (state.get('tweetPostSuccess') - 1))
    case 'SEARCH_SUCCESS':
      return state.searchResults.add(payload.tweetIds)
    case 'CLEAR_SEARCH':
    default:
      return state
  }
}
