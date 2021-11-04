const express = require("express");
const app = express();

const PORT = 8080;

const { db } = require("./db");

const startServer = async() => {
  await db.sync();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
}
startServer();

// Matches any url to a possible file in the public directory.
app.use(express.static(__dirname + "/public"));

// Start of all middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const genresRouter = require("./routes/genre");
app.use("/genre", genresRouter);

const moviesRouter = require("./routes/movie");
app.use("/movies", moviesRouter);

app.get("/", (req, res) => {
  res.send(
    `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Movie Watchlist App</title>
          <link rel="stylesheet" type="text/css" href="/base-styling.css" />
          <link rel="stylesheet" type="text/css" href="/movie-list-style.css" />
        </head>
        <body>
          <div id="app"></div>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `
  );
});
