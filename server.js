'use strict';

require('dotenv').config({
  path: './.env'
});

global.__base = __dirname;

const grpc = require('grpc');

const config = require(`${global.__base}/server/config/config`);

const {
  logger
} = require(`${global.__base}/server/utilities/index`);

const {
  loadProto
} = require(`${global.__base}/server/init/protoLoader`);

const routes = require(`${global.__base}/server/routes`);

let server;

async function initialize() {
  logger.info('INITIALIZE', `Initializing ${config.app.applicationService}`);

  const {
    rpcServices
  } = await loadProto('INITIALIZE', config.proto.internalRpcProtoFileName, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: [
      config.proto.internalProtoPath
    ]
  });

  server = new grpc.Server();
  server.addService(rpcServices[config.proto.internalRpcServiceName].service, routes);
  server.bind(config.app.applicationBindTo, grpc.ServerCredentials.createInsecure());
  server.start();

  if (server.started) {
    logger.info('INITIALIZE', `Service is initialized and has bind to ${config.app.applicationBindTo}`);
  } else {
    logger.error('INITIALIZE', 'Service went through is initialization but failed start verification', server);
  }
}

initialize();
