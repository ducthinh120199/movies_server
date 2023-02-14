'use strict';
module.exports = function(app) {
   var todoList = require('../controllers/appController');

   // todoList Routes
  app.route('/movies')
    .get(todoList.list_all_movies)
    .post(todoList.create_a_movie);

  app.route('/movies/:movieId')
    .get(todoList.read_a_movie)
    .put(todoList.update_a_movie)
    .delete(todoList.delete_a_movie);
};