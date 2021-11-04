import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import movieWatchlistReduxStore from './store';

import store from './store';

import App from './components/App';

ReactDOM.render(
  <Provider store={movieWatchlistReduxStore}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
