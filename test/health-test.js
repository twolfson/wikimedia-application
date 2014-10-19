// Load in dependencies
var expect = require('chai').expect;
var httpUtils = require('request-mocha')(require('request'));
var serverUtils = require('./utils/server');

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
