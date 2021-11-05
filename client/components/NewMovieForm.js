import React from 'react';
import { connect } from 'react-redux';
import { fetchGenresFromServer } from '../store/genres';
import { createMovie } from '../store/movies';
// import { useNavigate } from 'react-router-dom';

class MovieForm extends React.Component {
  constructor() {
    super();
    this.state = {
      movieTitleTyped: "",
      imdbLinkTyped: "",
      selectedGenres: [],
      howManyGenresBeingSelected: 1
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGenreSelection = this.handleGenreSelection.bind(this);
    this.addAGenreSelectBox = this.addAGenreSelectBox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.goGetAllGenres();
  }
  handleInputChange(event) {
    const inputElement = event.target;
    const inputName = inputElement.name;
    const inputValue = inputElement.value;
    this.setState({
      [inputName]: inputValue
    });
  }
  handleGenreSelection(position, newGenre) {
    const newGenres = this.state.selectedGenres.slice(0);
    newGenres[position] = newGenre;
    this.setState({selectedGenres: newGenres});
  }
  createGenreSelectBoxes() {
    const eachSelectElement = [];
    for (let i = 0; i < this.state.howManyGenresBeingSelected; i++) {
      eachSelectElement.push(<select key={i} onChange={(event) => {
        const newGenreForThisSelect = event.target.value
        this.handleGenreSelection(i, newGenreForThisSelect)
      }}>
        <option></option>
        {this.props.genres.map(eachGenre => {
          return <option value={eachGenre.id} key={eachGenre.id}>{eachGenre.name}</option>
        })}
        </select>);
    }
    return eachSelectElement;
  }
  addAGenreSelectBox() {
    this.setState({
      howManyGenresBeingSelected: this.state.howManyGenresBeingSelected + 1
    });
  }
  async handleSubmit(submitEvent) {
    // const navigate = useNavigate();
    submitEvent.preventDefault();
    await this.props.createNewMovieOnServer({
      title: this.state.movieTitleTyped,
      link: this.state.imdbLinkTyped,
      genres: this.state.selectedGenres
    });
    // navigate("/"); react-router updated to v6. navigate replaced history. can't use navigate in class component. need
    // to refactor to functional component... -.-
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Movie Title:</label>
            <input type="text" name="movieTitle" onChange={this.handleInputChange} />
          </div>
          <div>
            <label>IMDB:</label>
            <input type="text" name="imdbLinkTyped" onChange={this.handleInputChange} />
          </div>
          <div>
            {this.createGenreSelectBoxes()}
            <button type="button" onClick={this.addAGenreSelectBox}>+</button>
          </div>
          <button type="submit">Create New Movie</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (fullReduxState) => {
  return {
    genres: fullReduxState.selectableGenres
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goGetAllGenres: () => {
      dispatch(fetchGenresFromServer());
    },
    createNewMovieOnServer: (newMovieInfo) => {
      const thunk = createMovie(newMovieInfo);
      return dispatch(thunk);
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(MovieForm);