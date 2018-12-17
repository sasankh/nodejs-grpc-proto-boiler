'use strict';

const health = require(`${global.__base}/server/handlers/health`);

module.exports = {
  basicHealthCheck: health.basicHealthCheck,
  deepHealthCheck: health.deepHealthCheck
};
