import axios from 'axios';

const SET_GENRES = 'SET_GENRES';

export const setGenresActionCreator = (genres) => {
  return {
    type: SET_GENRES,
    genresToSet: genres
  }
}

export const fetchGenresFromServer = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/genre");
      const genres = response.data;
      dispatch(setGenresActionCreator(genres));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createNewGenreOnServer = (newGenreName) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post("/genre", {theName: newGenreName});
      const newGenreCreatedByServer = response.data;
      const currentGenres = getState().selectableGenres;
      const setGenresAction = setGenresActionCreator(currentGenres.concat(newGenreCreatedByServer));
      dispatch(setGenresAction);
    } catch (error) {
      console.error(error);
    }
  }
}

export default (state = [], action) => { // Receives the current value of this state slice
  if (action.type === SET_GENRES) {
    return action.genresToSet; // This is the key we shoudl expect on actions.
  }
  return state;
};
