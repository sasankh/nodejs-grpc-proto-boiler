// 'use strict';
//
// const grpc = require('grpc');
// const protoLoader = require('@grpc/proto-loader');
//
// function loadProto(protoFile, options) {
//   return new Promise((resolve, reject) => {
//     try {
//       const packageDefinition = protoLoader.loadSync(protoFile, options);
//       const rpcServices = grpc.loadPackageDefinition(packageDefinition);
//
//       resolve({
//         packageDefinition,
//         rpcServices
//       });
//     } catch (e) {
//       reject(e)
//     }
//   });
// };
//
// module.exports.getClient = (service, protoFile, serviceUrl, options) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const {
//         packageDefinition,
//         rpcServices
//       } = loadProto(protoFile, options);
//
//       const client = new protoRpcs[service](serviceUrl, grpc.credentials.createInsecure());
//
//       resolve(client);
//     } catch (e) {
//       reject(e);
//     }
//   });
// }
