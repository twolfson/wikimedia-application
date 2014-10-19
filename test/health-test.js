// Load in dependencies
var url = require('url');
var _ = require('underscore');
var expect = require('chai').expect;
var httpUtils = require('request-mocha')(require('request'));
var MiniWiki = require('../');

var config = {
  // TODO: For easier local testing, use a dynamic port to avoid conflicts
  test: {
    protocol: 'http',
    hostname: 'localhost',
    port: 3000
  }
};

var serverUtils = {
  getUrl: function (_urlObj) {
    // If the URL is a string, upcast it to an object
    var urlObj = _urlObj;
    if (typeof _urlObj === 'string') {
      urlObj = {
        pathname: _urlObj
      };
    }

    // Return the connected URL
    return url.format(_.defaults({}, urlObj, config.test));
  },
  run: function (configOverride) {
    // TODO: Implement config override and test config
    var server;
    before(function startServer (done) {
      server = new MiniWiki(config.test);
      server.listen(done);
    });
    after(function stopServer (done) {
      server.destroy(done);
    });
  }
};

// Start our tests
describe('A health check to a mini-wiki server', function () {
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/health'));

  it('is online and working', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
    expect(this.body).to.equal('OK');
  });
});
