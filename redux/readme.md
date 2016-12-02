Twitter for emojis.

Serves as an example for those interested in putting together react, redux (including redux-sagas), and Immutable.js in a client app that depends on a foreign JSON API (not provided here).

Adheres to some (but not all!) of the best practices for developing highly scalable react + redux web applications.

For Freehack peeps => track my progress, :)

* [x] Dockerize for effortless deployment on cheapest AWS servers (11 hrs)
* [x] Client-side performance enhancements w/file-size reductions+chunking (5 hrs)
* [x] Design a redux store for effective client side caching (5 hrs)
* [x] Design all components (5 hrs)
* [x] Setup redux, all related libraries (3 hrs)
* [x] Structure repo for the A+ (4 hrs)
* [x] Setup store (2 hrs)
* [ ] [Status: WIP - depends on the next 3)] Map redux store to all components
* [ ] [Status: 1/3 complete)] redux-sagas (psuedocode, rough implementation, test)
* [ ] [Status: 1/2 complete)] User actions (action literals, action creators)
* [ ] [Status: 1/4 complete)] Reducers (setup, psuedocode, rough implementation, test)
* [ ] Wrap calls to API & test
* [ ] Hook up to mock API and DB on a proxy port, run sample user interaction(s)
* [ ] Polish (if necessary)

To check it out in the most recent development stage:
 * Find the most recent branch(es)
 * Clone or fork
 * Install Docker to your machine (if you don't have it)
 * Be sure the Docker daemon is running
 * Navigate to the repo directory on your machine
 * Run the following commands:
~~~~
docker-compose build
docker-compose up
~~~~
 * Navigate to "localhost:3000"
 * You should see the application running in the state described above.
