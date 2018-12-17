'use strict';

const {
  createLogger,
  transports,
  format
} = require('winston');

const {
  combine,
  timestamp,
  label,
  printf
} = format;

const WinstonDailyRotateFile = require('winston-daily-rotate-file');

const config = require(`${global.__base}/server/config/config`);

const {
  logLevel,
  logPath,
  logFiles,
  logFormat
} = config.log;

const logFolder = 'logs';
const validLogLevels = [
  'error',
  'warn',
  'info',
  'verbose',
  'debug',
  'silly'
];

// loggers
const loggers = {};

const logSyntax = printf((info) => {
  switch (logFormat) {
  case 'json':
    return `{timestamp: ${info.timestamp}, label: ${info.label}, level: ${info.level.toUpperCase()}, message: ${info.message}}`;

  case 'sentence':
  default:
    return `${info.timestamp}-[${info.label}]-[${info.level.toUpperCase()}] - ${info.message}`;
  }
});

function initializeLoggers(type) {
  return new Promise((resolve) => {
    const logTransports = [
      new transports.Console()
    ];

    if (logFiles === 'true' || logFiles === true) {
      logTransports.push(
        new WinstonDailyRotateFile({
          filename: `${type}-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          dirname: `${logPath}/${logFolder}/${type.toLowerCase()}`
        })
      );
    }

    loggers[type] = createLogger({
      level: (validLogLevels.includes(logLevel) ? logLevel : 'silly'),
      transports: logTransports,
      format: combine(
        label({
          label: config.app.applicationService
        }),
        timestamp(),
        logSyntax
      )
    });

    resolve();
  });
}

async function initialize() {
  await initializeLoggers('main');
  await initializeLoggers('health');
}

function getLogger(type) {
  if (!loggers[type]) {
    initializeLoggers(type);
  }

  return loggers[type];
}

initialize();

module.exports = {
  main: getLogger('main'),
  health: getLogger('health')
};
