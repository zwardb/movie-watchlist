const express = require("express");
const router = express.Router();

module.exports = router;

const { Movie, Genre } = require("../db");

// GET /movies
router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.findAll({
      include: [Genre],
      order: [
        ["title", "ASC"]
      ],
    });
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

// GET /movies/feeling-lucky
router.get("/feeling-lucky", async (req, res, next) => {
  try {
    const allUnwatchedMovies = await Movie.findAll({
      where: {
        watched: false
      }
    });
    const amountOfUnwatchedMovies = allUnwatchedMovies.length;
    const randomNumber = Math.floor(Math.random() * amountOfUnwatchedMovies);
    const chosenMovie = allUnwatchedMovies[randomNumber];
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Your Chosen Movie</title>
          <link rel="stylesheet" type="text/css" href="/base-styling.css" />
        </head>
        <body>
          <h1>You should watch: ${chosenMovie.title}</h1>
          <a href="/movies">Back to list</a>
          <a href="/movies/feeling-lucky">Try Again</a>
        </body>
      </html>
    `)
  } catch (error) {
    next(error);
  }
});

router.get("/:movieId/mark-watched", async (req, res, next) => {
  const id = req.params.movieId;
  try {
    const theMovie = await Movie.findByPk(id);
    if (!theMovie) {
      res.status(404).send("No movie with that id");
      return;
    }
    theMovie.watched = true;
    await theMovie.save();
    res.redirect("/movies");
  } catch (error) {
    next(error)
  }
});

// POST /movies
router.post("/", async (req, res, next) => {
  try {
    const { title, link, genres } = req.body;

    const newMovie = await Movie.create({
      title,
      imdbLink: link || null
    });
    await newMovie.setGenres(genres);
    const newMovieWithGenres = await Movie.findByPk(newMovie.id, {
      include: [Genre]
    });
    res.json(newMovieWithGenres);
  } catch (error) {
    next(error);
  }
});
