// Load in dependencies
var assert = require('assert');
var _ = require('underscore');
var async = require('async');
var redis = require('redis');
var redisLock = require('redis-lock');

// Load in config
var config = require('./config');

// Define different ways to access config data
exports.getStatic = function (env, overrideConfig) {
  // If the environment is common, reject it
  assert.notEqual(env, 'common', '"common" is not allowed to be a requested environment. Please choose from `local`, `test`, or `production`');

  // Grab the environment
  var envConfig = config[env];
  assert(envConfig, 'Configuration for "' + env + '" was not found. Please specify `local`, `test`, or `production`');

  // Shallow extend on the provided overrides
  var staticConfig = _.extend({}, envConfig, overrideConfig);

  // Return a deep clone of the settings to prevent pollution
  // TODO: Deep clone
  return staticConfig;
};

exports.getSettings = function (env, overrideConfig, cb) {
  // Load in static settings
  var settings = exports.getStatic(env, overrideConfig);

  // Initialize clients and add on teardown functions
  var teardownFns = [];
  var redisSettings = settings.redis;
  settings.redisClient = redis.createClient(redisSettings.port, redisSettings.hostname);
  settings.redisLock = redisLock(settings.redisClient);
  teardownFns.push(function teardownRedis (cb) {
    settings.redisClient.quit(function ignoreError () {
      // DEV: Intentionally ignore error since this is a teardown

      // Clean up settings to avoid leaks
      delete settings.redisClient;
      delete settings.redisLock;

      // Callback
      cb();
    });
  });

  // Mock asynchronous behavior until we get an instantiation that requires async
  process.nextTick(function mockAsync () {
    // Add in a teardown method that runs the teardown functions
    settings.destroy = function (cb) {
      async.parallel(teardownFns, cb);
    };

    // Return the generated settings
    cb(null, settings);
  });
};
