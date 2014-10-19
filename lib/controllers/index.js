// Create simple health endpoint
exports.health = function (config) {
  return function healthFn (req, res, next) {
    res.send('OK');
  };
};

// TODO: Consider relocating this into another file
exports.articles = {
  getById: function (config) {
    return function getByIdFn (req, res, next) {
      // TODO: Implement article retrieval
    };
  },
  updateById: function (config) {
    return function updateByIdFn (req, res, next) {
      // TODO: Verify latest revision matches requested one
      // TODO: Lock file id
      // TODO: Update file
      // TODO: Bump revision index
      // TODO: Unlock file id
    };
  }
};
