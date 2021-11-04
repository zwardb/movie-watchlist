const express = require("express");
const router = express.Router();

module.exports = router;

const { Genre } = require("../db");

// GET /genre
router.get("/", async (req, res, next) => {
  try {
    const genres = await Genre.findAll({
      order: [["name", "ASC"]]
    });
    res.json(genres);
  } catch (error) {
    next(error)
  }
});

// POST /genre
router.post("/", async (req, res, next) => {
  try {
    const newGenre = await Genre.create({ name: req.body.theName });
    res.json(newGenre)
  } catch (error) {
    next(error);
  }
});
