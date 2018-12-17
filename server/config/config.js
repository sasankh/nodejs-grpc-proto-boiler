'use strict';

// Application Environment
exports.environment = process.env.ENVIRONMENT;

// Basic Application Config
exports.app = {
  applicationService: 'GRPC_BOILER_SERVICE', // Replace with the application name
  applicationBindTo: process.env.APPLICATION_BIND_TO
};

// proto
exports.proto = {
  protoPath: `${global.__base}/protos`,
  internalProtoPath: `${global.__base}/protos/internal`,
  internalRpcProtoFileName: 'rpcs.proto',
  internalRpcServiceName: 'GrpcBoilerPlate',
  externalProtoPath: `${global.__base}/protos/external`
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
