const fs = require('fs');
const {parallel} = require('gulp');
const typescript = require('./task-typescript');
const sass = require('./task-sass');

process.chdir(process.argv[5]);

global.packageJson = JSON.parse(
    fs.readFileSync(process.cwd() + '/package.json'));
global.callbacks = [];

typescript();
sass();

exports.default = parallel(...callbacks);
