'use strict';

global.__rootDirectory = __dirname;

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const istanbul = require('gulp-istanbul');

const log = require('fancy-log');

// constants
const serverDir = './server';
const testDir = './tests';
const golbalCoverageThreshold = '0';

const path = {
  SERVER: [
    'server.js',
    'gulpfile.js',
    `${serverDir}/**/*.js`,
    `${serverDir}/**/**/*.js`,
    `${serverDir}/**/**/**/*.js`
  ],
  COVERAGE: [
    `${serverDir}/server/handlers/*.js`
  ],
  TESTS: [
    `${testDir}/mocha/**/js`,
    `${testDir}/mocha/**/*.js`,
    `${testDir}/mocha/**/**/*.js`
  ],
  UNIT_TESTS: [
    `${testDir}/mocha/unit/*.js`,
    `${testDir}/mocha/unit/**/*.js`
  ],
  INTEGRATION_TESTS: [
    `${testDir}/mocha/integration/*.js`,
    `${testDir}/mocha/integration/**/*.js`
  ]
};

// lint server code
function lintServer() {
  return gulp.src(path.SERVER)
    .pipe(eslint())
    .pipe(eslint.format());
}

// lint test code
function lintTest() {
  return gulp.src(path.TESTS)
    .pipe(eslint())
    .pipe(eslint.format());
}

// unit test
function testUnit() {
  return gulp.src(path.UNIT_TESTS, {
    read: false
  })
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'mocha-jenkins-reporter',
      reporterOptions: {
        junit_report_name: 'GRPC_BOILER_SERVICE',
        junit_report_path: './tests/report/report_unit.xml',
        junit_report_stack: '1'
      },
      timeout: 10000
    }))
    .on('error', (err) => {
      log(err.toString());
      process.exit(1);
    });
}

// integration test
function testIntegration() {
  return gulp.src(path.INTEGRATION_TESTS, {
    read: false
  })
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'mocha-jenkins-reporter',
      reporterOptions: {
        junit_report_name: 'GRPC_BOILER_SERVICE',
        junit_report_path: './tests/report/report_integration.xml',
        junit_report_stack: '1'
      },
      timeout: 10000
    }))
    .on('error', (err) => {
      log(err.toString());
      process.exit(1);
    });
}

// test coverage
function testCoverage() {
  return gulp.src(path.COVERAGE)
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
}

// global test with coverage report
function testGlobal() {
  const testPaths = path.INTEGRATION_TESTS.concat(path.UNIT_TESTS);

  return gulp.src(testPaths, {
    read: false
  })
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'mocha-jenkins-reporter',
      reporterOptions: {
        junit_report_name: 'GRPC_BOILER_SERVICE',
        junit_report_path: './tests/report/report_global.xml',
        junit_report_stack: '1'
      },
      timeout: 10000
    }))
    .on('error', (err) => {
      log(err.toString());
    })
    .pipe(istanbul.writeReports({
      dir: './tests/report/coverage',
      reporters: [
        'lcov',
        'html',
        'text-summary'
      ],
      reportOpts: {
        dir: './tests/report/coverage'
      }
    }))
    .pipe(istanbul.enforceThresholds({
      thresholds: {
        global: golbalCoverageThreshold
      }
    }));
}

// nodemon
function nodemonStart() {
  nodemon({
    script: 'server.js',
    tasks: ['lint']
  })
    .on('restart', () => {
      log('Server Restarted');
    });
}

gulp.task('lint', gulp.series(lintServer, lintTest));
gulp.task('lint-server', gulp.series(lintServer));
gulp.task('lint-test', gulp.series(lintTest));

gulp.task('test-unit', gulp.series(testUnit));
gulp.task('test-integration', gulp.series(testIntegration));
gulp.task('test-all', gulp.series(
  testCoverage,
  testGlobal
));

gulp.task('default', gulp.series(
  lintServer,
  lintTest,
  nodemonStart
));
