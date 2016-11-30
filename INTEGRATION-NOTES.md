The client-side implements caching through the use of Redux. Redux is
essentially a state tree that serves as a single source of data for the entire
client-side application.

It's extremely important that the data returned from the server be denormalized
as possible, as the state tree (aka the store) is optimized for "flat" data.

So avoid nesting while constructing JSONs on the server, if possible!

Note: j-toker wraps up all user model updates and login/registration flows, so don't worry about coding an API for that.
Just be sure that the user model has the following extra fields:

 * bio
 * tagline
 * profileColor

With this in mind, we need:

 * All denied requests should return a standardized error JSON.  	
~~~~
{
    type: "error",
    msg: "reason here"
}
~~~~

Routes
------

 * GET most relevant, popular entities
   * I'll pass what the user is currently typing (as terms) in the search bar to the API
   * The frontend expects a SHORT (less than 10 for each) list of jsons for each relevant entity type
~~~~
// Route: TO DO

// Request:
{
    // terms represent what the user is currently typing (in order, term-by-term)
    terms: [
        {
            term: // the string representation of the term
            term_type: // whether the term is a HASHTAG, MENTION, or STRING denoted in all caps! 
        }
    ]
}

// Response:
{
    trending_hashtags: // array of strings,
    // an array of (abbreviated) profiles
    relevant_profiles: [
        {
            id: // the unique user id of the profile,
            handle: // tweetmoji handle,
            name: // the user's name
        }
    ]
}
~~~~

 * GET newsfeed tweets
~~~~
// Route: /api/v1/feed (TO DO: pagination)

// Request
{
    bookmark: // only show me results past this id (pagination, front-end extracts last id from the previous query by itself)
}

// Expects
{
    // An array of tweet objects
    posts: [
        {
            content: // emojione text representation,
            user: {
                // object representing the user who posted
            }
            wow_count: // int,
            like_count: // int,
            wowed: // bool,
            liked: // bool,
            created_at: // timestamp,
            id: // the unique ID for the tweet
        }
    ],
    more_exist: // are there more results for this query, boolean
}
~~~~

 * GET tweets from search
~~~~
// Route: /api/v1/feed (TO DO: pagination)

// Request
{
    // An optional terms array
    terms:[
        // Each term is an object
        {
            term: // a string representation of the term
            term_type: // whether the term is a HASHTAG, MENTION, or STRING denoted in all caps! 
        }
    ],
    bookmark: // only show me results past this id (pagination, front-end extracts last id from the previous query by itself)
}

// Expects
{
    // An array of tweet objects
    posts: [
        {
            content: // emojione text representation,
            // ...
        }
    ],
    more_exist: // are there more results for this query, boolean
}
~~~~

 * GET tweets for user
~~~~
// Route: /api/v1/users/:user_id/posts
// NOTE: can also set up /api/v1/me/posts if that helps

// Request
{
    bookmark: // only show me results past this id (pagination, front-end extracts last id from the previous query by itself)
}

// Expects
{
    // An array of tweet objects
    posts: [
        {
            content: // emojione text representation,
            // ...
        }
    ],
    more_exist: // are there more results for this query, boolean
}
~~~~

 * POST original tweet
~~~~
// Route: /api/v1/posts

// Request
{
    content: // emojione text representation (with whitespace)
}

// Expects
{
    post: {
        content: // emojione text representation,
        user: {
            // object representing the user who posted
        }
        wow_count: // int,
        like_count: // int,
        wowed: // bool,
        liked: // bool,
        created_at: // timestamp,
        id: // the unique ID for the tweet
    }
}
~~~~

* POST react or undo reaction to tweet
~~~~
// Route: /api/v1/posts/:post_id/react

// Request
{
    reaction: "like" or "wow",
    desired: "react" or "unreact"
}

// Expects
{
    post: {
        content: // emojione text representation,
        // ...
    }
}
~~~~

* GET a tweet
~~~~
// Route: /api/v1/posts/:post_id

// Expects
{
    post: {
        content: // emojione text representation,
        // ...
    }
}
~~~~

* DELETE tweet
~~~~
// Route: /api/v1/posts/:post_id

// Expects
{
   success: true,
   id: // the unique id of the deleted tweet
}
~~~~

 * GET connections for user
~~~~
// Route: TO DO

// Request
{
    bookmark: // only show me results past this id (pagination, front-end extracts last id from the previous query by itself)
}

// Expects
{
    // an array of connections
    connections: [
        {
            follower: // string => user id,
            following: // string => user id,
            connectionId: // the unique id for the connection
        }
    ]
    bookmark: // the new bookmark, or false
}
~~~~

 * DELETE connection for user (only your own)
~~~~
// Route: TO DO

// Expects
{
    success: true,
    id: // unique id of deleted connection
}
~~~~

If we have time
------

 * GET replies for tweet
~~~~
// Obsolete after `/api/v1/posts/:post_id`?
// Route: TO DO (lower priority)

// Request
{
    bookmark: // only show me results past this id (pagination, front-end extracts last id from the previous query by itself)
}

// Expects
{
    // An array of tweet objects
    posts: [
        {
            content: // emojione text representation,
            user: {
                // object representing the user who posted
            }
            wow_count: // int,
            like_count: // int,
            wowed: // bool,
            liked: // bool,
            created_at: // timestamp,
            id: // the unique ID for the tweet
        }
    ],
    // An array of objects representing the join entries for each of these replies on the original tweet in the DB
    joins: [
        {
            tweet_id: // id of the original tweet,
            reply_tweet_id: // id of the reply tweet,
            id: // IMPORTANT! The id of the join
        }
    ]
    more_exist: // are there more results for this query, boolean
}
~~~~

 * POST reply tweet
~~~~
// Route: /api/v1/posts

// Request
{
    reply_to: // id of tweet to reply to,
    content: // emoji text representation
}

// Expects
{
    // returned the created reply
    reply_post: {
        content: // emojione text representation,
        user: {
            // object representing the user who posted
        }
        wow_count: // int,
        like_count: // int,
        wowed: // bool,
        liked: // bool,
        created_at: // timestamp,
        id: // the unique ID for the tweet
    },
    // and also the join table entry
    {
        original_id: // id of the original tweet,
        reply_id: // id of the reply tweet,
        id: // IMPORTANT! The id of the join
    }
}
~~~~
