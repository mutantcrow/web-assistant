const chalk = require('chalk');
const getMatchedFiles = require('../utils/getMatchedFiles');

let files = null;

module.exports = (prompts, callbacks) => {
  prompts.next(
      {
        type: 'input',
        name: 'scssOutputPath',
        message: chalk.bgMagenta(' Select sass output path: '),
        validate: (input) => input.length > 0,
        when: ({entry}) => {
          files = getMatchedFiles(/\.scss$/, entry);

          if ( files.length > 0 ) {
            callbacks.push( callback );
            return true;
          }

          return false;
        },
      },
  );
};

const callback = (answers) => {
  console.log(chalk.bgMagenta(' SASS files: '));

  files.forEach((file) => console.log(file));
};
