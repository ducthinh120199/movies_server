'use strict';

var Movie = require('../models/appModel.js');

exports.list_all_movies = function(req, res) {
  Movie.getAllMovie(function(err, movie) {
    if (err)
      res.status(400).send({ error: false, message: err });
    res.status(200).send({ error: false, message: 'success', data: movie });
  });
};

exports.create_a_movie = function(req, res) {
  var new_movie = new Movie(req.body);

  //handles null error
  if(!new_movie.title && !new_movie.director && !new_movie.score && !new_movie.release && !new_movie.length && !new_movie.discription && !new_movie.image ) {
    res.status(400).send({ error: true, message: 'Please provide field' });
  }
  else {
    Movie.createMovie(new_movie, function(err, movie) {
      if (err)
        res.status(400).send({ error: true, message: err });
      res.json(movie);
    });
  }
};


exports.read_a_movie = function(req, res) {
  Movie.getMovieById(req.params.movieId, function(err, movie) {
    if (err)
      res.status(400).send(err);
    res.status(200).send({ error: false, message: 'success', data: movie });
  });
};


exports.update_a_movie = function(req, res) {
  Movie.updateById(req.params.movieId, new Movie(req.body), function(err, movie) {
    if (err)
      res.status(400).send(err);
      res.json(movie);
  });
};


exports.delete_a_movie = function(req, res) {
  Movie.remove( req.params.movieId, function(err, movie) {
    if (err)
      res.status(400).send(err);
    res.json({ message: 'Movie successfully deleted' });
  });
};
