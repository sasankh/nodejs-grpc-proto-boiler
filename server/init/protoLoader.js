'use strict';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

function loadProto(protoFile, options) {
  return new Promise((resolve, reject) => {
    try {
      const packageDefinition = protoLoader.loadSync(protoFile, options);
      const rpcServices = grpc.loadPackageDefinition(packageDefinition);

      resolve({
        packageDefinition,
        rpcServices
      });
    } catch (e) {
      reject(e);
    }
  });
}

function initializeClient(protoFile, options, service, serviceUrl) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        rpcServices
      } = await loadProto(protoFile, options);

      const client = new rpcServices[service](serviceUrl, grpc.credentials.createInsecure());

      resolve(client);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  loadProto,
  initializeClient
};
