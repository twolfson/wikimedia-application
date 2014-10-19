// Load in dependencies
var assert = require('assert');
var _ = require('underscore');

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

  // TODO: Perform instantiation on a per-environment basis
  process.nextTick(function mockAsyncActions () {
    // TODO: Push onto an array of teardown functions

    // TODO: Add in a teardown method that runs the teardown functions

    // Return the generated settings
    cb(null, settings);
  });
};
