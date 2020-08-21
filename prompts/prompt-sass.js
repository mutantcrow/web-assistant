const chalk = require('chalk');
const {getMatchedFiles} = require('../utils');

let files = null;

prompts.next(
    {
      type: 'input',
      name: 'scssOutputPath',
      message: chalk.green('Enter sass output directory path: '),
      default: () => {
        if ('undefined' !== typeof cachedPackageJson.entry.scss) {
          return cachedPackageJson.entry.scss.outputDir;
        }

        return '../dist';
      },
      validate: (input) => input.length > 0,
      when: ({entry}) => {
        files = getMatchedFiles(/\.scss$/, entry);

        if ( files.length > 0 ) {
          callbacks.unshift(callback);

          return true;
        }

        return false;
      },
    },
);

const callback = ({scssOutputPath}) => {
  console.log(chalk.blue('[i] Info: SASS file(s): '));

  files.forEach((file) => console.log(file));

  packageJson.entry.scss =
      {files: files, outputDir: scssOutputPath};
};
