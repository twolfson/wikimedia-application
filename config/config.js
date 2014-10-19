// TODO: When we hit too many variables, break into content-named files
//   that shallow extend onto each other and warn when a conflict occurs
exports.common = {
  articleDir: __dirname + '/../articles/',
  redis: {
    // TODO: In production, we should be talking to a load balanced redis service
    port: 6379,
    hostname: '127.0.0.1'
  },
  url: {
    internal: {
      protocol: 'http',
      hostname: 'localhost',
      // TODO: For easier local testing, use a dynamic port to avoid conflicts
      port: 3000
    }
  }
};

exports.test = {
  articleDir: __dirname + '/../test/data/articles/',
  redis: {
    // TODO: For easier local testing, use a dynamic port to avoid conflicts
    port: 9002,
    hostname: '127.0.0.1'
  },
  url: {
    internal: {
      protocol: 'http',
      hostname: 'localhost',
      // TODO: For easier local testing, use a dynamic port to avoid conflicts
      port: 9001
    }
  }
};
