'use strict';

const {
  logFormat
} = require(`${global.__base}/server/config/config`).log;

const {
  main,
  health
} = require(`${global.__base}/server/init/logger`);

function log(data) {
  main.log(data);
}

function rpcRequest(requestId, handlerName, payload) {
  const logData = {
    requestId,
    request: handlerName
  };

  if (['login', 'authentication'].indexOf(handlerName) === -1) {
    logData.payload = payload;
  }

  switch(logFormat) {
  case 'json':
    main.info(JSON.stringify(logData));
    break;

  case 'sentence':
  default:
    const payloadString = (logData.payload ? ` payload --> ${JSON.stringify(logData.payload)}` : '');
    main.info(`[${logData.requestId}] -> request-${logData.request}.${payloadString}`);
  }
};

function WriteLogClass(level){
  this.level = level;

  this.write = (requestId, message, details) => {
    const logData = {
      requestId,
      message,
      details
    };

    switch(logFormat) {
    case 'json':
      main[this.level](JSON.stringify(logData));
      break;

    case 'sentence':
    default:
      main[this.level](`[${logData.requestId}] -> ${logData.message} --> details --> ${JSON.stringify(logData.details)}`);
    }
  }
}

const loggers = {
  error: new WriteLogClass('error'),
  warn: new WriteLogClass('warn'),
  info: new WriteLogClass('info'),
  verbose: new WriteLogClass('verbose'),
  debug: new WriteLogClass('debug'),
  silly: new WriteLogClass('silly')
};

function logReject(requestId, body) {
  if(body.error) {
    logManager(requestId, body.error);
  } else {
    const newBody = {
      error: {
        level: 'error',
        message: 'Exception',
        details: {
          message: body.message,
          stack: body.stack
        }
      }
    };

    logManager(requestId, newBody.error);
  }
}

function logManager(requestId, body) {
  loggers[body.level].write(requestId, body.message, body.details);
}

module.exports = {
  main,
  health,
  log,
  rpcRequest,
  error: loggers.error.write,
  warn: loggers.warn.write,
  info: loggers.info.write,
  verbose: loggers.verbose.write,
  debug: loggers.debug.write,
  silly: loggers.silly.write,
  log_reject: logReject,
  log_manager: logManager
};
