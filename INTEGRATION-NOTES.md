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

 * GET most relevant, popular entities
   * I'll pass what the user is currently typing (as terms) in the search bar to the API
   * The frontend expects a SHORT (less than 10 for each) list of jsons for each relevant entity type
~~~~
// Route: 

// Request:
{
    // terms represent what the user is currently typing (in order, term-by-term)
    terms:[
        {
            term: // the string representation of the term
            termType: // whether the term is a HASHTAG, MENTION, or STRING denoted in all caps! 
        }
    ]
}

// Response:
{
    trendingHashtags: // array of strings,
    // an array of (abbreviated) profiles
    relevantProfiles: [
        {
            id: // the unique user id of the profile,
            handle: // tweetmoji handle,
            name: // the user's name
        }
    ]
}
~~~~

 * GET tweets
~~~~
// Route: 

// Request
{
    // An optional terms array
    terms:[
        // Each term is an object
        {
            term: // a string representation of the term
            termType: // whether the term is a HASHTAG, MENTION, or STRING denoted in all caps! 
        }
    ],
    bookmark: // only show me results past this id (pagination, front-end extracts last id from the previous query by itself)
}

// Expects
{
    // An array of tweet objects
    tweets: [
        {
            body: // emojione text representation,
            user: {
                // object representing the user who posted
            }
            wows: // int,
            likes: // int,
            createdAt: // timestamp,
            id: // the unique ID for the tweet
        }
    ],
    moreExist: // are there more results for this query, boolean
}
~~~~

 * GET tweets for user
~~~~
// Route:

// Request
{
    bookmark: // only show me results past this id (pagination, front-end extracts last id from the previous query by itself)
}

// Expects
{
    // An array of tweet objects
    tweets: [
        {
            body: // emojione text representation,
            user: {
                // object representing the user who posted
            }
            wows: // int,
            likes: // int,
            createdAt: // timestamp,
            id: // the unique ID for the tweet
        }
    ],
    moreExist: // are there more results for this query, boolean
}
~~~~

 * GET replies for tweet
~~~~
// Route:

// Request
{
    bookmark: // only show me results past this id (pagination, front-end extracts last id from the previous query by itself)
}

// Expects
{
    // An array of tweet objects
    tweets: [
        {
            body: // emojione text representation,
            user: {
                // object representing the user who posted
            }
            wows: // int,
            likes: // int,
            createdAt: // timestamp,
            id: // the unique ID for the tweet
        }
    ],
    // An array of objects representing the join entries for each of these replies on the original tweet in the DB
    joins: [
        {
            tweetId: // id of the original tweet,
            replyTweetId: // id of the reply tweet,
            id: // IMPORTANT! The id of the join
        }
    ]
    moreExist: // are there more results for this query, boolean
}
~~~~

 * POST original tweet
~~~~
// Route:

// Request
{
    body: // emojione text representation
}

// Expects
{
    tweet: {
        body: // emojione text representation,
        user: {
            // object representing the user who posted
        }
        wows: // int,
        likes: // int,
        createdAt: // timestamp,
        id: // the unique ID for the tweet
    }
}
~~~~

 * POST reply tweet
~~~~
// Route:

// Request
{
    emoji: // emoji text representation
}

// Expects
{
    // returned the created reply
    replyTweet: {
        body: // emojione text representation,
        user: {
            // object representing the user who posted
        }
        wows: // int,
        likes: // int,
        createdAt: // timestamp,
        id: // the unique ID for the tweet
    },
    // and also the join table entry
    {
        tweetId: // id of the original tweet,
        replyTweetId: // id of the reply tweet,
        id: // IMPORTANT! The id of the join
    }
}
~~~~

* Delete tweet
~~~~
// Route:

// Expects
{
   id: // the unique id of the deleted tweet
}
~~~~

 * Get connections for user
~~~~
// Route:

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

 * Delete connection for user (only your own)
~~~~
// Route:

// Expects
{
    id: // unique id of deleted connection
}
~~~~
