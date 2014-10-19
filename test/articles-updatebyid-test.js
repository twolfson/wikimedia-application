// Load in dependencies
var expect = require('chai').expect;
var httpUtils = require('request-mocha')(require('request'));
var serverUtils = require('./utils/server');

// Start our tests
describe.only('An update to an existing article', function () {
  serverUtils.run();
  httpUtils.save({
    method: 'PUT',
    json: {
      content: 'oh hai'
    },
    url: serverUtils.getUrl('/articles/Latest_plane_crash')
  });

  it('marks the status as a success', function () {
    expect(this.err).to.equal(null);
    expect(this.res.statusCode).to.equal(200);
    expect(this.body).to.deep.equal({status: 'success'});
  });

  describe('and a read of the content', function () {
    httpUtils.save(serverUtils.getUrl('/articles/Latest_plane_crash'));

    it.skip('maintains the new revision', function () {

    });

    it('maintains the new content', function () {
      expect(this.err).to.equal(null);
      expect(this.res.statusCode).to.equal(200);
      expect(JSON.parse(this.body)).to.have.property('content', 'oh hai');
    });
  });
});