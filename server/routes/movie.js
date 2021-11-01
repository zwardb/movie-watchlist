const express = require("express");
const router = express.Router();

module.exports = router;

const { Movie, Genre } = require("../db");

// GET /movies
router.get("/", (req, res) => {
  res.send("Movie list haha");
});

// GET /movies/add-movie
router.get("/add-movie", async (req, res) => {
  // res.sendFile(__dirname + "/views/movie-form.html");
  const allGenres = await Genre.findAll();
  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Add a movie to your watchlist</title>
    </head>
    <body>
      <h1>Add movie</h1>
      <form method="POST" action="/movies">
        <div>
          <label>Title:</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label>IMDB link:</label>
          <input type="text" name="link" placeholder="Optional" />
        </div>
        <div>
        <div id="genre-selects-container">
          <select id="genre-select" name="genres">
            <option></option>
            ${
              allGenres.map(genre => {
                return `<option value="${genre.id}">${genre.name}</option>`
              }).join("")
            }
          </select>
          </div>
          <button type="button" id="add-button">+</button>
        </div>
        <button type="submit">Add Movie</button>
      </form>
      <script type="text/javascript" src="/movie-form.js"></script>
    </body>
  </html>
  `)
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
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});
