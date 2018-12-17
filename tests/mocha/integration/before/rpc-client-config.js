// 'use strict';
//
// const INTERNAL_PROTO_PATH = `${global.__rootDirectory}/protos/internal/rpcs.proto`;
//
// const grpc = require('grpc');
//
// const protoLoader = require('@grpc/proto-loader');
//
// const packageDefinition = protoLoader.loadSync(
//   INTERNAL_PROTO_PATH,
//   {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true
//   }
// );
//
// const protoRpcs = grpc.loadPackageDefinition(packageDefinition);
