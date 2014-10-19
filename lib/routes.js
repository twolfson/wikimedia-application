// Load in dependencies
var express = require('express');
var bodyParser = require('body-parser');
var controllers = require('./controllers');

// Define common routes
exports.common = function (config) {
  // Generate a router
  var router = new express.Router();

  // TODO: Add error generating endpoints
  //   Good for testing how the server handles errors/reports them

  // Articles routes
  // TODO: Add planned routes listed in README
  router.get('/articles/:id', controllers.articles.getById(config));
  router.put('/articles/:id', bodyParser.json(), controllers.articles.updateById(config));

  // Health endpoint
  router.get('/health', controllers.health(config));

  // TODO: Handle missing pages and encountered errors

  // Return our router as a middleware `function (req, res, next) {}`
  return router;
};
