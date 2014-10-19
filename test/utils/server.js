// Load in dependencies
var url = require('url');
var _ = require('underscore');
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
  var staticConfig = config.getStatic('test');
  return url.format(_.defaults({}, urlObj, staticConfig));
};

exports.run = function (configOverride) {
  // TODO: Implement config override and test config
  var settings, server;
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
    // TOOD: Implement teardown
    // settings.teardown(function handleSettingsDestroy () {
      server.destroy(done);
    // });
  });
};
