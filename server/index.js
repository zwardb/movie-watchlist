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

// Start of all middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const genresRouter = require("./routes/genre");
app.use("/genre", genresRouter);

app.get("/", (req, res) => {
  res.send("Hello :)");
});
