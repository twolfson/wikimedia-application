// Load in dependencies
var fs = require('fs');
var path = require('path');
var HttpError = require('../errors/').HttpError;

// Define common helper functions
function _getArticleFilepath(config) {
  return function getArticleFilepathFn (id) {
    // DEV: We prevent against `/` attacks by using `encodeURIComponent`
    return path.join(config.articleDir, encodeURIComponent(id) + '.txt');
  };
}

// Expose REST-ful methods
exports.getById = function (config) {
  var getArticleFilepath = _getArticleFilepath(config);
  return function getByIdFn (req, res, next) {
    // TODO: We should be using a store to know which articles are define/not
    //   However, since we lack a `creation` endpoint we are going to use this hack for now
    var articleId = req.params.id;
    if (articleId !== 'Latest_plane_crash') {
      return next(new HttpError('Article does not exist', 404));
    }

    // Buffer file into memory
    // TODO: It would be nice to generate a JSON stream that recieve the file pipe
    //   However, I could not find it during a quick search of node modules
    var filepath = getArticleFilepath(articleId);
    fs.readFile(filepath, 'utf8', function handleFile (err, content) {
      // If an error occured
      if (err) {
        // If the file doesn't exist, respond with an empty string
        // TODO: We shouldn't be doing this but it is because we haven't implemented POST yet
        if (err.code === 'ENOENT') {
          return res.send({content: ''});
        // Otherwise, send the error onward
        // DEV: If we had time to implement it, the error handler would report it and reply with a 500
        } else {
          return next(err);
        }
      }

      // Otherwise, send the content as part of a JSON blob
      // TODO: Add a revision property
      res.send({
        content: content
      });
    });
  };
};

exports.updateById = function (config) {
  var getArticleFilepath = _getArticleFilepath(config);
  return function updateByIdFn (req, res, next) {
    // TODO: We should be using a store to know which articles are define/not
    //   However, since we lack a `creation` endpoint we are going to use this hack for now
    var articleId = req.params.id;
    if (articleId !== 'Latest_plane_crash') {
      return next(new HttpError('Article does not exist', 404));
    }

    // TODO: Verify latest revision matches requested one
    // TODO: Lock file id

    // Update file
    var filepath = getArticleFilepath(articleId);
    fs.writeFile(filepath, req.body.content, function handleWrite (err) {
      // If an error occurred, callback with it
      if (err) {
        return next(err);
      // Otherwise, send a success message
      // TODO: We should probably consolidate success into its own Error type
      } else {
        // TODO: Bump revision index
        // TODO: Recursively calculate fibb(42)
        // TODO: Unlock file id
        res.send({status: 'success'});
      }
    });
  };
};
