#! /usr/bin/env node
const path = require('path');
const execSync = require('child_process').execSync;

const parameters = [
  'gulp',
  '--gulpfile',
  path.resolve(__dirname, 'gulpfile.js'),
  '--option',
  path.resolve(process.cwd(), 'package.json'),
];

execSync(parameters.join(' '), {stdio: 'inherit'});
