const chalk = require('chalk');
const {getMatchedFiles} = require('../utils');

let files = null;

prompts.next(
    {
      type: 'input',
      name: 'jsOutputPath',
      message: chalk.green('Enter javascript output directory path: '),
      default: () => {
        if ('undefined' !== typeof cachedPackageJson.entry.js) {
          return cachedPackageJson.entry.js.outputDir;
        }

        return '../dist';
      },
      validate: (input) => input.length > 0,
      when: ({entry}) => {
        files = getMatchedFiles(/\.js$/, entry);

        if ( files.length > 0 ) {
          callbacks.unshift(callback);
          return true;
        }

        return false;
      },
    },
);

prompts.next(
    {
      type: 'list',
      name: 'jsFormat',
      message: chalk.green('Select javascript module format: '),
      choices: [
        'amd',
        'cjs',
        'es',
        'iife',
        'umd',
        'system',
      ],
      default: () => {
        if ( 'undefined' !== typeof cachedPackageJson.entry.js) {
          return cachedPackageJson.entry.js.format;
        }

        return 'iife';
      },
      when: ({jsOutputPath}) => jsOutputPath,
    },
);

const callback = ({jsOutputPath, jsFormat}) => {
  console.log(chalk.blue('[i] Info: Javascript file(s): '));

  files.forEach((file) => console.log(file));

  packageJson.entry.js =
      {files: files, outputDir: jsOutputPath, format: jsFormat};
};
