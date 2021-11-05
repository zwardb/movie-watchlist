import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import movieWatchlistReduxStore from './store';
import App from './components/App';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={movieWatchlistReduxStore}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.querySelector('#app')
);
