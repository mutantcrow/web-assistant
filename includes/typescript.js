const chalk = require('chalk');
const getMatchedFiles = require('../utils/getMatchedFiles');

let files = null;

module.exports = (prompts, callbacks) => {
  prompts.next(
      {
        type: 'input',
        name: 'tsOutputPath',
        message: chalk.bgBlue(' Select typescript output path: '),
        validate: (input) => input.length > 0,
        when: ({entry}) => {
          files = getMatchedFiles(/\.ts$/, entry);

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
  console.log(chalk.bgBlue(' Typescript files: '));

  files.forEach((file) => console.log(file));
};
