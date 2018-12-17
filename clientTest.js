'use strict';

const GRPC_BOILER_SERVICE_PROTO_PATH = `${__dirname}/protos/internal/rpcs.proto`;

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    GRPC_BOILER_SERVICE_PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const protoRpcs = grpc.loadPackageDefinition(packageDefinition);

function checkBasicHealthCheck(clientService) {
  clientService.basicHealthCheck({}, function(err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
    }
  });
}

function checkDeepHealthCheck(clientService) {
  clientService.deepHealthCheck({}, function(err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
    }
  });
}

function makeHealthChecks() {
  const client = new protoRpcs.GRPC_BOILER_SERVICE('localhost:50051', grpc.credentials.createInsecure());

  checkBasicHealthCheck(client);
  checkDeepHealthCheck(client);
}

makeHealthChecks();
