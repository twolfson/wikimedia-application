// Load in dependencies
var fs = require('fs');
var url = require('url');
var _ = require('underscore');
var rimraf = require('rimraf');
var MiniWiki = require('../../');
var config = require('../../config');

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
  var staticConfig = config.getStatic('test').url.internal;
  return url.format(_.defaults({}, urlObj, staticConfig));
};

exports.run = function (configOverride) {
  var settings, server;
  before(function cleanupArticles (done) {
    var articleDir = __dirname + '/../data/articles/';
    rimraf(articleDir, function handleError () {
      fs.mkdir(articleDir, done);
    });
  });
  before(function startServer (done) {
    config.getSettings('test', configOverride, function handleSettings (err, _settings) {
      // If there was an error, handle it
      if (err) {
        return done(err);
      }

      // Otherwise, save the settings and instantiate our server with them
      settings = _settings;
      server = new MiniWiki(settings);
      server.listen(done);
    });
  });
  after(function stopServer (done) {
    // Destroy server and setting connections (e.g. redis)
    server.destroy(function handleStopServer () {
      settings.destroy(done);
    });
  });
};
