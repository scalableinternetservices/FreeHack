# Tweetmoji

Tweetmoji is a post-textual news and communication platform for everyone. Use it to share wisdom in the universal language of emoji.

Runs on `rails 5.0.0`

Optimized branches:

* `top` - the best we've got: all optimizations merged, inherits from `database-opt` and `caching`

* `database-opt` - indexes tables and fetches related recodes early

* `multithreading` - uses Puma in clustered mode to make full use of CPUs

* `caching` - implements low-level caching, Memcached, serializer caching (inherits from `multithreading`)

Notes:

* Our application is implemented with an API and a React.js front-end web app, exchanging json

* Launching an instance will cause 1000 initial users and their posts to be seeded. 


## Contributors

Anirudh Narayan ([@anirudhNarayan](http://github.com/anirudhNarayan))

Chris Laganiere ([@chrislaganiere](http://github.com/chrislaganiere))

Parth Radia ([@pradia](http://github.com/pradia))

Yunwen Zhu ([@mysteryjoe](http://github.com/mysteryjoe))
