'use strict';

require('dotenv').config({
  path: './.env'
});

global.__base = __dirname;

// initialize
require(`${global.__base}/server/init/logger`)
const logger = require(`${global.__base}/server/init/logger`).main;
//console.log(logger)

logger.info("Server is up :):):)")
