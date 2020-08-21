#! /usr/bin/env node
process.env.PRODUCTION = 'true';

require('./worker.js');
