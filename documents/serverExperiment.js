'use strict';

require('dotenv').config({
  path: './.env'
});

global.__base = __dirname;

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const {
  logger
} = require(`${global.__base}/server/utilities/index`);


// const PROTO_PATH = `${global.__base}/protos/helloworld.proto`;
//
// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true
// });
//
// const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
//
// /**
//  * Implements the SayHello RPC method.
//  */
// function sayHello(call, callback) {
//   console.log('######')
// console.log(call.request)
// console.log('#######')
//   callback(null, {message: 'This is response test ' + call.request.name})
// }
//
// let server;
//
// function initializeServer() {
//   server = new grpc.Server();
//   const bindTo = '0.0.0.0:50051';
//
//   server.addService(hello_proto.Greeter.service, {sayHello: sayHello});
//   server.bind(bindTo, grpc.ServerCredentials.createInsecure());
//   server.start();
//
//   if (server.started) {
//     logger.info('INITIALIZE', `Service is initialized and has bind to ${bindTo}`);
//   } else {
//     logger.info('INITIALIZE', `Service went through is initialization but failed start verification`, server);
//   }
// }
//
// initializeServer();


////////////////////////////////////////////////////////////////////////////

const PROTO_PATH = `${global.__base}/protos/internal`;

const packageDefinition = protoLoader.loadSync('rpcs.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [PROTO_PATH]
});

const protoRpc = grpc.loadPackageDefinition(packageDefinition);

console.log(protoRpc)

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, {message: 'This is response test2 ' + call.request.name})
}

let server;

function initializeServer() {
  server = new grpc.Server();
  const bindTo = '0.0.0.0:50051';

  server.addService(protoRpc.Greeter.service, {sayHello: sayHello});
  server.bind(bindTo, grpc.ServerCredentials.createInsecure());
  server.start();

  if (server.started) {
    logger.info('INITIALIZE', `Service is initialized and has bind to ${bindTo}`);
  } else {
    logger.info('INITIALIZE', `Service went through is initialization but failed start verification`, server);
  }
}

initializeServer();


//////////////////////////////////////////////////////////


// const protos = require(`${global.__base}/server/init/protoLoader`);
