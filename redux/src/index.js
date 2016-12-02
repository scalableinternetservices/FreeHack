import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './core/store';
import { configure } from "redux-auth";
import { initializeCurrentLocation } from 'redux-little-router';
import Root from './views/root';

export const APIUrl = process.env.API_URL

const store = configureStore();

// Configure redux-auth, before rendering anything!
store.dispatch(configure(
  { apiUrl: APIUrl },
  { clientOnly: true, cleanSession: true}
)).then(() => {
  // redux-little-router initialization
  const initialLocation = store.getState().router;

  if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation));
  }

  const rootElement = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, rootElement);
})
