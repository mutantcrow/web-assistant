const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const {babel} = require('@rollup/plugin-babel');

global.data = require(process.cwd() + '/package.json');
global.production = 'true' === process.env.PRODUCTION;

const rootDir = path.resolve(process.env.CALLER_DEST);
const dstDir = path.join(rootDir, 'dist');
const extensions = ['.ts', '.js'];

module.exports = {
  input: {
    app: rootDir + '/app.ts',
  },
  output: {
    dir: dstDir,
    format: 'iife',
    name: 'RollupModule',
  },
  plugins: [
    resolve({
      extensions,
    }),
    babel({
      extensions,
      presets: [
        '@babel/preset-env',
        '@babel/typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
      ],
    }),
  ],
};
