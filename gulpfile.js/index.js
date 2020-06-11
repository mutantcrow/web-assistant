const {series, parallel} = require('gulp');
const clean = require('./task-clean');
const sass = require('./task-sass');

process.chdir(process.env.CALLER_DEST);

global.production = 'true' === process.env.PRODUCTION;
global.packageJson = require(process.cwd() + '/package.json');
global.callbacks = {series: [], parallel: []};

clean();
sass();

exports.default = series(
    ...callbacks.series, parallel(...callbacks.parallel));
