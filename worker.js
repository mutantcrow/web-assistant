#! /usr/bin/env node
const {resolve} = require('path');
const {execSync} = require('child_process');

process.env.TASK = process.argv[2];
process.env.PRODUCTION = process.argv[3] === 'prod';
process.env.CALLER_DEST = process.cwd();

process.chdir(__dirname);

execSync( 'rollup -c ' +
    (process.env.PRODUCTION === 'false' ? '-w ' : '') +
    resolve(__dirname, 'rollup-config.js'),
{stdio: 'inherit'});

