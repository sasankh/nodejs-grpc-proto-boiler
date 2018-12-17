'use strict';

require('dotenv').config({
  path: './.env'
});

global.__base = __dirname;

const logger = require(`${global.__base}/server/init/logger`).main;

logger.info('Server is up');
