import React from 'react';
import axios from 'axios';

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
  constructor() {
    super();
    this.state = {
      fetchedMovies: null
    }
  }
  async componentDidMount() {
    // THIS WILL BE REFACOTRED LATER TO USE THUNKS
    const response = await axios.get("/movies");
    const ourMovies = response.data;
    this.setState({ fetchedMovies: ourMovies });
  }
  render() {
    if (this.state.fetchedMovies === null) {
      return <h3>Loading...</h3>
    }
    return (
      <div id="movie-list">
          <ul id="list-of-movies">
            {this.state.fetchedMovies.map(aMovie => {
              return <Movie key={aMovie.id} theMovie={aMovie} />;
            })}
          </ul>
      </div>
    )
  }
}

export default MovieList;
