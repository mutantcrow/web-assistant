const chalk = require('chalk');
const {getMatchedFiles} = require('../utils');

let files = null;

module.exports = () => {
  prompts.next(
      {
        type: 'input',
        name: 'tsOutputPath',
        message: chalk.bgBlue(' Enter typescript output path: '),
        default: () => {
          if ('undefined' !== packageJson.output.ts) {
            return packageJson.output.ts;
          }
          return '../dist';
        },
        validate: (input) => input.length > 0,
        when: ({entry}) => {
          files = getMatchedFiles(/\.ts$/, entry);

          if ( files.length > 0 ) {
            callbacks.unshift( callback );
            return true;
          }

          return false;
        },
      },
  );
};

const callback = ({tsOutputPath}) => {
  console.log(chalk.bgBlue(' Typescript files: '));

  files.forEach((file) => console.log(file));

  packageJson.entry.ts = files;
  packageJson.output.ts = tsOutputPath;
};
