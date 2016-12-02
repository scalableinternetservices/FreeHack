import { applyMiddleware, compose, createStore } from 'redux';
import { routerForBrowser } from 'redux-little-router';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import reducers from './reducers';
import sagas from './sagas';

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(sagaMiddleware);

  // Define your routes in a route-to-anything hash like below.
  // The value of the route key can be any serializable data.
  // This data gets attached to the `router` key of the state
  // tree when its corresponding route is matched and dispatched.
  // Useful for page titles and other route-specific data.

  // Uses https://github.com/snd/url-pattern for URL matching
  // and parameter extraction.
  const routes = {
    '/': {
      '/home': {
        '/search': {}
      },
      '/users': {
        '/:userid': {
          '/followers': {},
          '/following': {}
        },
      },
    },
  }

  // Install the router into the store for a browser-only environment.
  // routerForBrowser is a factory method that returns a store
  // enhancer and a middleware.
  const {
    routerEnhancer,
    routerMiddleware
  } = routerForBrowser({
    // The configured routes. Required.
    routes
  })

  middleware = compose(
                routerEnhancer,
                applyMiddleware(routerMiddleware, thunk),
                middleware)

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  const store = createStore(reducers, middleware);

  sagaMiddleware.run(sagas);

  if (module.hot) {
     module.hot.accept('./reducers', () => {
       store.replaceReducer(require('./reducers').default);
     });
   }

  return store;
}
