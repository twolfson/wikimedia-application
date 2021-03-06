// Load in dependencies
var bodyParser = require('body-parser');
var express = require('express');
var routes = require('./routes');

// Define our mini wiki server
// DEV: Due to comfort and past experience, I am using a pattern
//   from github/twolfson/twolfson.com that is very testable on a per-config basis
function MiniWiki(config) {
  // Create server and save for later
  this.app = express();
  this.config = config;

  // Bind routes to the app
  this.bindRoutes();
}
MiniWiki.prototype = {
  bindRoutes: function () {
    // Localize config and app
    var app = this.app;
    var config = this.config;

    // Parse incoming bodies
    app.use(bodyParser.json());

    // TODO: Check and add dev/test routes if `config` calls for it

    app.use(routes.common(config));

    // TODO: Add custom error handler
  },
  listen: function (cb) {
    var port = this.config.url.internal.port;
    this._app = this.app.listen(port, cb);
  },
  destroy: function (cb) {
    this._app.close(cb);
  }
};

// Export the server constructor
module.exports = MiniWiki;
