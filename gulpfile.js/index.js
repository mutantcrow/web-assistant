const {readFileSync} = require('fs');
const {series, parallel} = require('gulp');
const clean = require('./task-clean');
const typescript = require('./task-typescript');
const sass = require('./task-sass');

process.chdir(process.argv[5]);

global.packageJson = JSON.parse(
    readFileSync(process.cwd() + '/package.json'));
global.callbacks = {series: [], parallel: []};

// TODO: Get build from task that sent from package.json.

clean();
typescript();
sass();

exports.default = series(...callbacks.series, parallel(...callbacks.parallel));
