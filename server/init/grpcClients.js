'use strict';

const config = require(`${global.__base}/server/config/config`);

const {
  initializeClient
} = require('./protoLoader');

const clients = {};

const protoOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: config.proto.protoDirToInclude
};

const {
  external
} = config.proto.external;

// set the service config here
const serviceConfig = {
  rpcServiceName1: {
    protoFile: external.sampleServiceExample1.protoFileName1,
    options: protoOptions,
    service: external.sampleServiceExample1.rpcServiceName1,
    serviceUrl: external.sampleServiceExample1.sampleServiceAddress
  }
};

let clientList;

function initializeIndividual(service) {
  return new Promise(async (resolve, reject) => {
    try {
      clients[service] = await initializeClient(
        serviceConfig[service].protoFile,
        serviceConfig[service].options,
        serviceConfig[service].service,
        serviceConfig[service].serviceUrl
      );
    } catch (e) {
      reject(e);
    }
  });
}
function initialize() {
  clientList = Object.keys(serviceConfig);

  clientList.forEach(async (service) => {
    await initializeIndividual(service);
  });
}

function getClient(client) {
  return new Promise(async (resolve, reject) => {
    try {
      if (clientList.includes(client)) {
        if (!clients[client]) {
          await initializeIndividual(client);
        }

        resolve(clients[client]);
      } else {
        reject({
          error: {
            level: 'warn',
            message: 'Cannot return client as requested service not listed in external service list'
          }
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}

initialize();

module.exports = {
  getClient,
  initializeClient
};
