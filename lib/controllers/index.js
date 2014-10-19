// Load in external controller sets
exports.articles = require('./articles');

// Create simple health endpoint
exports.health = function (config) {
  return function healthFn (req, res, next) {
    res.send({status: 'OK'});
  };
};
