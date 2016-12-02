export const tweetActions = {
  CREATE_TWEET_DRAFT: 'CREATE_TWEET_DRAFT',
  SET_TWEET_EMOJI: 'SET_TWEET_EMOJI',
  CREATE_TWEET: 'CREATE_TWEET',
  CREATE_TWEET_SUCCESS: 'CREATE_TWEET_SUCCESS',
  CREATE_TWEET_FAILED: 'CREATE_TWEET_FAILED',

  CANCEL_CREATE_TWEET: 'CANCEL_CREATE_TWEET',

  DELETE_TWEET: 'DELETE_TWEET',
  DELETE_TWEET_SUCCESS: 'DELETE_TWEET_SUCCESS',
  DELETE_TWEET_FAILED: 'DELETE_TWEET_FAILED',

  POLL_TWEETS: 'POLL_TWEETS',
  POLL_TWEETS_SUCCESS: 'POLL_TWEETS_SUCCESS',
  POLL_TWEETS_FAILED: 'POLL_TWEETS_FAILED',

  FILTER_TWEETS_SEARCH_BAR: 'FILTER_TWEETS',
  FILTER_TWEETS_SEARCH_BAR_SUCCESS: 'FILTER_TWEETS_SERVER_SUCCESS',
  FILTER_TWEETS_SEARCH_BAR_FAILED: 'FILTER_TWEETS_SERVER_FAILED',

  GET_TWEETS: 'GET_TWEETS',
  GET_TWEETS_SUCCESS: 'GET_TWEETS_SUCCESS',
  GET_TWEETS_FAILED: 'GET_TWEETS_FAILED',

  SET_ACTIVE_TWEET: 'SET_ACTIVE_TWEET',

  createTweetDraft: (reply = {}) => ({
    type: tweetActions.CREATE_TWEET_DRAFT,
    payload: { reply }
  }),

  createTweet: (emojiOneRep, ogTweetId = {}) => ({
    type: tweetActions.CREATE_TWEET,
    payload: { emojiOneRep, ogTweetId }
  }),

  createTweetSuccess: tweet => ({
    type: tweetActions.CREATE_TWEET_SUCCESS,
    payload: { tweet }
  }),

  createTweetFailed: error => ({
    type: tweetActions.CREATE_TWEET_FAILED,
    payload: { error }
  }),

  cancelCreateTweet: () => ({
    type: tweetActions.CANCEL_CREATE_TWEET,
  }),

  pollTweets: (searchParams = {}, user = {}) => ({
    type: tweetActions.POLL_TWEETS,
    payload: { searchParams, user }
  })
}
