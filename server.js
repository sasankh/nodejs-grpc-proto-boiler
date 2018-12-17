'use strict';

require('dotenv').config({
  path: './.env'
});

global.__base = __dirname;

const {
  logger
} = require(`${global.__base}/server/utilities/index`);

function testLogFunction() {
  logger.info('requestId', 'This is a message section', { data: { test: 'test'}});
  logger.error('requestId', 'This is a message section', { data: { test: 'test'}});
  logger.warn('requestId', 'This is a message section', { data: { test: 'test'}});
  logger.silly('requestId', 'This is a message section', { data: { test: 'test'}});
  logger.verbose('requestId', 'This is a message section', { data: { test: 'test'}});
  logger.debug('requestId', 'This is a message section', { data: { test: 'test'}});
  logger.log_reject('requestId', {
    error:{
      level: 'error',
      message: 'This is log reject test',
      details: {
        mode: "this is details"
      }
    }
  })
}

testLogFunction();
