// Load in dependencies
var url = require('url');
var _ = require('underscore');

// Define common server utilities
exports.getUrl = function (_urlObj) {
  // If the URL is a string, upcast it to an object
  var urlObj = _urlObj;
  if (typeof _urlObj === 'string') {
    urlObj = {
      pathname: _urlObj
    };
  }

  // Return the connected URL
  return url.format(_.defaults({}, urlObj, config.test));
};

exports.run = function (configOverride) {
  // TODO: Implement config override and test config
  var server;
  before(function startServer (done) {
    server = new MiniWiki(config.test);
    server.listen(done);
  });
  after(function stopServer (done) {
    server.destroy(done);
  });
};
