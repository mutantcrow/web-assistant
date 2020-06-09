#! /usr/bin/env node
const {resolve} = require('path');
const execSync = require('child_process').execSync;

process.env.PRODUCTION = process.argv[2] === 'production';
process.env.CALLER_DEST = process.cwd();

execSync( 'gulp --gulpfile ' + resolve(__dirname, 'gulpfile.js'),
    {stdio: 'inherit'});
