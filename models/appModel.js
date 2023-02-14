'user strict';
var sql = require('./db.js');

//Task object constructor
var Movie = function(moive) {
    this.title = moive.title;
    this.director = moive.director;
    this.score = moive.score;
    this.release = moive.release;
    this.length = moive.length;
    this.discription = moive.discription;
    this.image = moive.image;
    this.created_at = new Date();
};
Movie.createMovie = function createMovie(newMovie, result) {
  sql.query("INSERT INTO movies set ?", newMovie, function (err, res) {

    if(err) {
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};
Movie.getMovieById = function getMovieById(movieId, result) {
  sql.query("Select * from movies where id = ? ", movieId, function (err, res) {
    if(err) {
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};
Movie.getAllMovie = function getAllMovie(result) {
  sql.query("Select * from movies", function (err, res) {

    if(err) {
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};
Movie.updateById = function(id, task, result){
  sql.query("UPDATE movies SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
    if(err) {
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};
Movie.remove = function(id, result){
  sql.query("DELETE FROM movies WHERE id = ?", [id], function (err, res) {

    if(err) {
      result(null, err);
    }
    else {
      result(null, res);
    }
  });
};

module.exports = Movie;
