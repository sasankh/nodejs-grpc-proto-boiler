'use strict';

require('dotenv').config({
  path: './.env'
});

global.__base = __dirname;

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const config = require(`${global.__base}/server/config/config`);

const {
  logger
} = require(`${global.__base}/server/utilities/index`);

// const INTERNAL_PROTO_PATH = `${global.__base}/protos/internal`;

const packageDefinition = protoLoader.loadSync(config.proto.internalRpcProtoFileName, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [
    config.proto.internalProtoPath
  ]
});

const protoRpc = grpc.loadPackageDefinition(packageDefinition);

/**
 * Implements the SayHello RPC method.
 */
// function sayHello(call, callback) {
//   callback(null, {message: 'This is response test2 ' + call.request.name})
// }
//
// const services = { sayHello };

const routes = require(`${global.__base}/server/routes`);

const server = new grpc.Server();
server.addService(protoRpc[config.app.applicationService].service, routes);
server.bind(config.app.applicationBindTo, grpc.ServerCredentials.createInsecure());
server.start();

if (server.started) {
  logger.info('INITIALIZE', `Service is initialized and has bind to ${config.app.applicationBindTo}`);
} else {
  logger.info('INITIALIZE', `Service went through is initialization but failed start verification`, server);
}
