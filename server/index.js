const express = require("express");
const app = express();

const PORT = 8080;

const db = require("./db");

const startServer = async() => {
  await db.sync();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
}
startServer();

app.get("/", (req, res) => {
  res.send("Hello :)");
});
