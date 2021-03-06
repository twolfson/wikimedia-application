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
    expect(JSON.parse(this.body)).to.deep.equal({content: ''});
  });
});

describe('A fetch for an existing article', function () {
  serverUtils.run({
    articleDir: __dirname + '/data/articles-full/'
  });
  httpUtils.save(serverUtils.getUrl('/articles/Latest_plane_crash'));

  it('replies with the article content', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
    expect(JSON.parse(this.body)).to.deep.equal({content: 'Hello World!\n'});
  });
});

describe('A fetch for a non-existant article', function () {
  serverUtils.run();
  httpUtils.save(serverUtils.getUrl('/articles/does-not-exist'));

  it('replies with an error', function () {
    // TODO: Implement error handler for HttpError since this should be a 404
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(500);
  });
});
