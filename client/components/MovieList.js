import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';

import {fetchMoviesFromServer} from '../store/movies'

class Movie extends React.Component {
  render() {
    const { theMovie } = this.props;
    return (
      <li className={theMovie.watched ? "watched" : ""}>
        <h2>{theMovie.title} {theMovie.imdbLink && <a target="_blank" href={theMovie.imdbLink}>IMDB</a>}</h2>
        <ul className="genres-list">
          {theMovie.genres.map(genre => {
            return <li key={genre.id}><a>{genre.name}</a></li>
          })}
        </ul>
      </li>
    )
  }
}

class MovieList extends React.Component {
  componentDidMount() {
    this.props.fetchMovies();
  }
  render() {
    if (this.props.moviesFromState.length === 0) {
      return <h3>Loading...</h3>
    }
    return (
      <div id="movie-list">
          <ul id="list-of-movies">
            {this.props.moviesFromState.map(aMovie => {
              return <Movie key={aMovie.id} theMovie={aMovie} />;
            })}
          </ul>
      </div>
    )
  }
}



export default connect(
  // Map State to Props,
  // anything we want from the redux store
  (fullReduxState) => {
    return {
      moviesFromState: fullReduxState.movies
    }
  },

  //Map Dispatch to Props,
  // access to the dispatch function of the redux state to send actions
  (dispatchToStore) => {
    return {
      fetchMovies: async () => {
        dispatchToStore(fetchMoviesFromServer());
      }
    };
  }
)(MovieList);
