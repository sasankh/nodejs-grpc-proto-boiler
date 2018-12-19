// 'use strict';
//
// const config = require(`${global.__base}/server/config/config`);
//
// const {
//   initializeClient
// } = require('./protoLoader');
//
// const external = config.proto.external;
// const serviceOptions = {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
//   includeDirs: [
//     config.proto.external
//   ]
// };
//
// // set ther service config here
// const serviceConfig = {
//   // external service 1
//   rpcServiceName1: {
//     protoFile:  external.sampleServiceExample1.protoFileName1,
//     options: Object.assign(serviceOptions, {
//       includeDirs: [external.sampleServiceExample1.]
//     })
//
//     protoPath: `${global.__base}/protos/internal`,
//     protoFileName1: 'rpcs.proto',
//     rpcServiceName1: 'GrpcBoilerPlate',
//     sampleServiceAddress: process.env.SAMPLE_SERVICE_ADDRESS || 'localhost:50051'  // this is just sample address
//
//
//   }
// };
//
// const services = {};
// let servicesList = [];
//
// protoFile, options, service, serviceUrl
//
// async function initialize() {
//   externalServices.rpcServiceName1 = await initializeClient(
//     'INITIALIZE',
//
//   );
// }
//
// initialize();
//
// function getClient(type) => {
//   return new Promise((resolve, reject) => {
//     try {
//       if (externalServices.includes(type)) {
//
//       } else {
//         reject(
//           error: {
//             level: 'warn',
//             message: 'Cannot return client as requested service not listed in external service list'
//           }
//         )
//       }
//     } catch (e) {
//       reject(e);
//     }
//   }
// }
