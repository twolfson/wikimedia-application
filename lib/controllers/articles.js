// Load in dependencies
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
    if (req.id !== 'Latest_plane_crash') {
      return next(new HttpError('Article does not exist', 404));
    }

    // Open a stream from the article on disk
    var filepath = getArticleFilepath(req.id);
    var articleStream = fs.createReadStream(filepath);

    // If an error occurs
    articleStream.on('error', function handleError (err) {
      // If the file doesn't exist, respond with an empty string
      // TODO: We shouldn't be doing this but it is because we haven't implemented POST yet
      if (err.code === 'EMFILE') {
        res.send('');
      // Otherwise, send the error onward
      // DEV: If we had time to implement it, the error handler would report it and reply with a 500
      } else {
        next(err);
      }
    });

    // Otherwise, pipe the contents to response
    articleStream.pipe(res);
  };
};

exports.updateById = function (config) {
  return function updateByIdFn (req, res, next) {
    // TODO: Verify latest revision matches requested one
    // TODO: Lock file id
    // TODO: Update file
    // TODO: Bump revision index
    // TODO: Recursively calculate fibb(42)
    // TODO: Unlock file id
    res.send('Not yet implemented');
  };
};
