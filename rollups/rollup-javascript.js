const remove = require('rollup-plugin-delete');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const {babel} = require('@rollup/plugin-babel');
const {terser} = require('rollup-plugin-terser');

if (
  'undefined' === typeof packageJson.entry.js ||
  'undefined' !== process.env.TASK &&
  'js' !== process.env.TASK
) {
  return;
}

const {outputDir, format} = packageJson.entry.js;
let {files} = packageJson.entry.js;

if ('undefined' !== process.env.FILE ) {
  files = [process.env.FILE];
}

files.forEach((file) => {
  configs.push({
    input: `${callerDest}/${file}`,
    output: {
      file: `${callerDest}/${outputDir}/${file}`,
      format: format,
      sourcemap: !production,
    },
    plugins: [

      production && remove({
        targets: [
          `${callerDest}/${outputDir}/${file}`,
          `${callerDest}/${outputDir}/${file}.map`,
        ],
        force: true,
        verbose: true,
      }),

      resolve(),

      commonjs(),

      babel({
        presets: [
          '@babel/preset-env',
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-syntax-dynamic-import',
        ],
        babelHelpers: 'bundled',
      }),

      production && terser({
        output: {
          comments: false,
        },
      }),

    ],
  });
});
