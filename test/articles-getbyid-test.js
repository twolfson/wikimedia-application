// Load in dependencies
var expect = require('chai').expect;
var httpUtils = require('request-mocha')(require('request'));
var serverUtils = require('./utils/server');

// Start our tests
describe('A fetch for an empty yet existing article', function () {
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/articles/Latest_plane_crash'));

  it('replies with the article content', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
    expect(this.body).to.equal('');
  });
});

describe.skip('A fetch for an existing article', function () {
  serverUtils.run({
    articleDir: __dirname + '/../articles-full/'
  });
  httpUtils.save(serverUtils.getUrl('/articles/Latest_plane_crash'));

  it('replies with the article content', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
    expect(this.body).to.equal('');
  });
});
