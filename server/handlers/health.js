'use strict';

const cuid = require('cuid');

const {
  logger
} = require(`${global.__base}/server/utilities`);

module.exports.basicHealthCheck = (call, callback) => {
  const requestId = cuid();

  logger.rpcRequest(requestId, 'basicHealthCheck', call.request);
  callback(null, {
    service: true,
    message: 'This is basic health check response'
  });
};

module.exports.deepHealthCheck = (call, callback) => {
  const requestId = cuid();

  logger.rpcRequest(requestId, 'deepHealthCheck', call.request);
  callback(null, {
    service: true,
    message: 'This is deep health check response'
  });
};
