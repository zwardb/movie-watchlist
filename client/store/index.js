/*
  {
    movies: Array of movie objects (rows in database)
    selectableGenres: Array of genre objects (rows in database)
    randomMovie ("I'm feeling lucky"): A single movie object
  }

  Canonical source of changing information in our application

  Dispatch an action to the store:
    store.dispatch({ type: SET_ALL_MOVIES, movie: moviesFromServer })

*/

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import moviesReducer from './movies';
import genresReducer from './genres';

const storeObject = createStore(combineReducers({
  movies: moviesReducer,
  selectableGenres: genresReducer,
  randomMovie: (state = null) => { // Initial state of movie object in I'm feeling lucky: nothing/null
    return state;
  }
}), applyMiddleware(thunkMiddleware));

export default storeObject;
