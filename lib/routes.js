// Load in dependencies
var express = require('express');
var controllers = require('./controllers');

// Define common routes
exports.common = function (config) {
  // Generate a router
  var router = new express.Router();

  // Articles routes
  // TODO: Add planned routes listed in README
  router.get('/articles/:id', controllers.articles.getById);
  router.put('/articles/:id', controllers.articles.updateById);

  // TODO: Handle missing pages and encountered errors

  // Return our router as a middleware `function (req, res, next) {}`
  return router.middleware;
};
