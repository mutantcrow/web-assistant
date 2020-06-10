const {readFileSync} = require('fs');
const {series, parallel} = require('gulp');
const clean = require('./task-clean');
const typescript = require('./task-typescript');
const sass = require('./task-sass');

process.chdir(process.env.CALLER_DEST);

global.production = 'true' === process.env.PRODUCTION;
global.packageJson = JSON.parse(
    readFileSync(process.cwd() + '/package.json'));
global.callbacks = {series: [], parallel: []};

clean();
typescript();
sass();

exports.default = series(
    ...callbacks.series, parallel(...callbacks.parallel));
