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
  internal: {
    internalRpcProtoFileName: 'rpcs.proto',
    internalRpcServiceName: 'GrpcBoilerPlate',
  },
  protoDirToInclude: [
    `${global.__base}/protos/internal`, // required
    // other proto dir to include if any
    `${global.__base}/protos/external`
  ],
  external: {
    // config for external service protos
    // below is just an example. any related attribute can be added on the service object
    // create new objects below
    sampleServiceExample1: {
      protoFileName1: 'rpcs.proto',
      rpcServiceName1: 'GrpcBoilerPlate',
      sampleServiceAddress: process.env.SAMPLE_SERVICE_ADDRESS || 'localhost:50051'  // this is just sample address
    }
  }
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
