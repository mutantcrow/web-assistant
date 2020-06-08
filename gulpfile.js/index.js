const fs = require('fs');
const {series} = require('gulp');
const typescript = require('./task-typescript');
const sass = require('./task-sass');

const packageJson = JSON.parse(fs.readFileSync(process.argv[5]));
const callbacks = [];

typescript(packageJson, callbacks);
sass(packageJson, callbacks);

exports.default = series(...callbacks);
