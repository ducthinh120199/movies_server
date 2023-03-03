const express = require('express');
const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal Server Error',
  });
});

let routes = require('../routes/api'); //importing route
routes(app); //register the route

module.exports = app;