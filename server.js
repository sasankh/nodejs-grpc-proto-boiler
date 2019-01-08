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
  try {
    logger.info('INITIALIZE', `Initializing ${config.app.applicationService}`);

    const {
      rpcServices
    } = await loadProto(config.proto.internal.internalRpcProtoFileName, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: config.proto.protoDirToInclude
    });

    server = new grpc.Server();
    server.addService(rpcServices[config.proto.internal.internalRpcServiceName].service, routes);
    server.bind(config.app.applicationBindTo, grpc.ServerCredentials.createInsecure());
    server.start();

    if (server.started) {
      logger.info('INITIALIZE', `Service is initialized and has bind to ${config.app.applicationBindTo}`);
    } else {
      logger.error('INITIALIZE', 'Service went through is initialization but failed start verification', server);
    }
  } catch (e) {
    logger.error('INITIALIZE', 'Problem initializing server', e);
  }
}

initialize();

module.exports = server;
