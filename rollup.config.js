global.callerDest = process.env.CALLER_DEST;
global.packageJson = require( callerDest + '/package.json');
global.production = 'true' === process.env.PRODUCTION;
global.configs = [];

require('./rollups/rollup-javascript');
require('./rollups/rollup-sass');

module.exports = configs;
