import { tweetActions } from './actions';
import { userActions } from '../users';
import { authActions } from '../../auth';
import { tweetApi } from './api'
import { fetch } from "redux-auth-patch";
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { APIUrl } from '../../../index'

// Utility function to delay effects
function delay(millis) {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(true), millis)
    });
    return promise;
}

function getTweets(search = {}) {
  const promise = fetch(APIUrl + '/api/v1/recent')
    .then(resp => {
      if (resp.ok === true)
        return resp.json()
      else
        throw Error(resp.statusText);
    })
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

  return promise
}

function reactTweet(id, type, polarity) {

  let translatedIntent = ''

  switch (polarity)
  {
    case 'true':
      translatedIntent = 'react'
      break
    case 'false':
      translatedIntent = 'unreact'
      break
    default:
  }

  const promise = fetch(APIUrl + '/api/v1/posts/'+id+'/react', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reaction: type,
        desired: translatedIntent,
      })
    })
    .then(resp => {
      if (resp.ok === true)
        return resp.json()
      else
        throw Error(resp);
    })
    .catch((err) => { throw Error(err) })
    .then(json => json.post)

  return promise
}

function postTweet(content) {

  const promise = fetch(APIUrl + '/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: content
      })
    })
    .then(resp => {
      if (resp.ok === true)
        return resp.json()
      else
        throw Error(resp);
    })
    .catch((err) => { throw Error(err) })
    .then(json => json.post)

  return promise
}

function* fetchTweets() {
  while (true) {
    let action = yield take(tweetActions.POLL_TWEETS)

    try {
      const result = yield call(getTweets)

      if (typeof(result.posts) != 'undefined')
      {
        let posts = result.posts
        let users = result.users

        yield put({ type: tweetActions.POLL_TWEETS_SUCCESS, payload: { posts }  })
        yield put({ type: userActions.POLL_USERS_SUCCESS, payload: { users } })
      }
    }
    catch(error) {
      yield put({ type: tweetActions.POLL_TWEETS_FAILED })
    }
    /*}
    catch(error) {
      yield put({ type: tweetActions.POLL_TWEETS_SUCCESS, error })
    }*/
  }
}

function* postReaction() {
  while (true) {
    let action = yield take('POST_REACTION')

    try {
      const result = yield call(
                      reactTweet,
                      action.payload.id,
                      action.payload.type,
                      action.payload.polarity)

      yield put({ type: 'POST_REACTION_SUCCESS', payload: { result } })
    }
    catch(error) {
      yield put({ type: 'POST_REACION_FAILED' })
    }

  }
}

function* postTweetHandler() {
  while (true) {
    let action = yield take('POST_TWEET')

    try {
      const result = yield call(postTweet, action.payload.emojiOneRep)
      console.log(result)
      yield put({ type: 'POST_TWEET_SUCCESS', payload: { result } })
    }
    catch(error) {
      yield put({ type: 'POST_TWEET_FAILED' })
    }

  }
}

// Fetch data every 5 seconds
function* pollData() {
    try {
        yield call(delay, 5000);
        yield put(tweetActions.pollTweets());
    } catch (error) {
        // cancellation error -- can handle this if you wish
        return;
    }
}

// Wait for successful response, then fire another request
// Cancel polling if user logs out
function* watchPollData() {
  while (true) {
      yield take(tweetActions.POLL_TWEETS_SUCCESS);
      yield call(pollData)
  }
}

function* watchPollError() {
  while (true) {
      let error = yield take(tweetActions.POLL_TWEETS_FAILED);
      yield call(pollData)
  }
}

function* watchReaction() {
  while (true) {
      let action = yield take('TOGGLE_REACTION');
      yield put({ type: 'POST_REACTION', payload: action.payload });
  }
}

function* watchCreateTweet() {
  while (true) {
      let action = yield take(tweetActions.CREATE_TWEET);
      yield put({ type: 'POST_TWEET', payload: action.payload });
  }
}

function* watchSearchActive() {
  while (true) {
      let action = yield take(tweetActions.SEARCH_ACTIVE);
      yield put({ type: 'POST_TWEET', payload: action.payload });
      let release = yield take(tweetActions.SEARCH_INACTIVE);
  }
}

export const tweetSagas = [
  fork(watchPollData),
  fork(watchPollError),
  fork(watchReaction),
  fork(watchCreateTweet),
  fork(pollData),
  fork(fetchTweets),
  fork(postReaction),
  fork(postTweetHandler)
]
