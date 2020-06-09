const chalk = require('chalk');
const {getMatchedFiles} = require('../utils');

let files = null;

module.exports = () => {
  prompts.next(
      {
        type: 'input',
        name: 'scssOutputPath',
        message: chalk.bgMagenta(' Enter sass output path: '),
        validate: (input) => input.length > 0,
        when: ({entry}) => {
          files = getMatchedFiles(/\.scss$/, entry);

          if ( files.length > 0 ) {
            callbacks.unshift( callback );
            return true;
          }

          return false;
        },
      },
  );
};

const callback = ({scssOutputPath}) => {
  console.log(chalk.bgMagenta(' SASS files: '));

  files.forEach((file) => console.log(file));

  packageJson.entry.scss = files;
  packageJson.output.scss = scssOutputPath;
};
