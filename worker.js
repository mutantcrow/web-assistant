#! /usr/bin/env node
const {execSync} = require('child_process');

process.env.TASK = process.argv[2];
process.env.FILE = process.argv[3];
process.env.CALLER_DEST = process.cwd();

process.chdir(__dirname);

execSync( 'rollup -c ' +
    // Do not watch if it is in build mode.
    (process.env.PRODUCTION === 'true' ? '' : '-w '),
{stdio: 'inherit'});
