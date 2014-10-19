// Load in dependencies
var express = require('express');

// Define our mini wiki server
// DEV: Due to comfort and past experience, I am using a pattern
//   from github/twolfson/twolfson.com that is very testable on a per-config basis
function MiniWiki(config) {
  // Create server and save for later
  this.app = express();
  this.config = config;

  // Bind routes to the app
}
MiniWiki.prototype = {
  bindRoutes: function () {
    // Localize config and app
    var app = this.app;
    var config = this.config;

    // TODO: Check and add dev/test routes if `config` calls for it

    app.use(routes.common(config));

    // TODO: Add custom error handler
  },
  listen: function (cb) {
    var port = config.port;
    this._app = this.app.listen(port, cb);
  },
  destroy: function (cb) {
    this._app.close(cb);
  }
};

// Export the server constructor
module.exports = MiniWiki;
