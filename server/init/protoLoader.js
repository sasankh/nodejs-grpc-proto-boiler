'use strict';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const {
  logger
} = require(`${global.__base}/server/utilities/index`);

module.exports.loadProto = (requestId, protoFile, options) => {
  return new Promise((resolve) => {
    logger.debug(requestId, 'loadProto', {
      protoFile,
      options
    });

    const packageDefinition = protoLoader.loadSync(protoFile, options);
    const rpcServices = grpc.loadPackageDefinition(packageDefinition);

    resolve({
      packageDefinition,
      rpcServices
    });
  });
};
