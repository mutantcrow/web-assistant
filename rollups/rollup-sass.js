const remove = require('rollup-plugin-delete');
const postcss = require('rollup-plugin-postcss');
const atImport = require('postcss-import');
const copy = require('postcss-copy');
const autoprefixer = require('autoprefixer');

if (
  'undefined' === typeof packageJson.entry.scss ||
  'undefined' !== process.env.TASK &&
  'scss' !== process.env.TASK
) {
  return;
}

const {outputDir} = packageJson.entry.scss;
let {files} = packageJson.entry.scss;

if ('undefined' !== process.env.FILE ) {
  files = [process.env.FILE];
}

files.forEach((file) => {
  const plugins = [];
  const outputFile = file.replace('.scss', '.css');

  plugins.push(
      postcss(
          {
            extract: true,
            plugins: [
              atImport,
              autoprefixer,
              copy({
                basePath: [callerDest],
                dest: `${callerDest}/${outputDir}`,
                template: '[name]-[hash].[ext]',
              }),
            ],
            minimize: production,
            sourceMap: !production,
            use: [
              ['sass', {
                includePaths: [
                  `${callerDest}/${
                    packageJson.externalModulesPath}node_modules/`,
                ],
              }],
            ],
          },
      ),
  );

  if (production === true) {
    plugins.unshift(
        remove({
          targets: [
            `${callerDest}/${outputDir}/${outputFile}`,
            `${callerDest}/${outputDir}/${outputFile}.map`,
          ],
          force: true,
          verbose: true,
        }),
    );
  }

  configs.push(
      {
        input: `${callerDest}/${file}`,
        output: {
          file: `${callerDest}/${outputDir}/${outputFile}`,
          format: 'es',
        },
        plugins: plugins,
      },
  );
});
