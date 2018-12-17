'use strict';

require('dotenv').config({
  path: '../../.env'
});

// Application Environment
exports.environment = process.env.ENVIRONMENT;

// Basic Application Config
exports.app = {
  applicationService: 'GRPC_BOILER_SERVICE', // Replace with the application name
  port: process.env.PORT
};

// Log configs
exports.log = {
  logLevel: process.env.LOG_LEVEL,
  logPath: process.env.LOG_PATH,
  logFiles: process.env.LOG_FILES || 'false',
  logFormat: process.env.LOG_FORMAT || 'sentence'
};

// Credentials, api_key, etc of other services
exports.credentials = {};

// External Base Urls
exports.url = {};

// External application endpoints
exports.apis = {};
