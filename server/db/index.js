const Sequelize = require("sequelize");

const db = new Sequelize(
  "postgres://localhost:5432/moviewatchlist"
)

const Movie = db.define("movie", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imdbLink: {
    type: Sequelize.STRING(1000),
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  watched: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

const Genre = db.define("genre", {
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
});

Movie.belongsToMany(Genre, { through: "movies-genres" });
Genre.belongsToMany(Movie, { through: "movies-genres" });

module.exports = {
  db,
  Movie,
  Genre
};
