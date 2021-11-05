import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import MovieList from './MovieList';
import NewMovieForm from './NewMovieForm';
import GenreForm from './GenreForm';

class App extends React.Component {
  render() {
    return (
      <div>
        <Link id="logo" to="/"><h1>Movie List</h1></Link>
        <nav>
          <Link to="/add-movie">Create a New Movie</Link>
          <Link to="/add-genre">Create a New Genre</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<MovieList />} />
          <Route path="/add-movie" element={<NewMovieForm />} />
          <Route path="/add-genre" element={<GenreForm />} />
          <Navigate to="/" />
        </Routes>
      </div>
    )
  }
}

export default App;
