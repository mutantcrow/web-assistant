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
  const plugins = [];

  plugins.push(resolve());
  plugins.push(commonjs());
  plugins.push(
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
  );

  if (production === true) {
    plugins.unshift(
        remove({
          targets: [
            `${callerDest}/${outputDir}/${file}`,
            `${callerDest}/${outputDir}/${file}.map`,
          ],
          force: true,
          verbose: true,
        }),
    );

    plugins.push(
        terser({
          output: {
            comments: false,
          },
        }),
    );
  }

  configs.push(
      {
        input: `${callerDest}/${file}`,
        output: {
          file: `${callerDest}/${outputDir}/${file}`,
          format: format,
          sourcemap: !production,
        },
        plugins: plugins,
      },
  );
});
