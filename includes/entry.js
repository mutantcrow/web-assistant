const fs = require('fs');
const chalk = require('chalk');

module.exports = (prompts, callbacks) => {
  prompts.next(
      {
        type: 'checkbox',
        name: 'entry',
        message: chalk.bold.yellow(' Select entry file(s): '),
        choices: fs.readdirSync(process.cwd()),
        pageSize: 10,
        validate: (input) => input.length > 0,
      },
  );

  callbacks.push(callback);
};

const callback = (answers, callbacks) => {
  if ( callbacks.length <= 1 ) {
    console.log(chalk.yellow(' No configuration task started. '));
  }
};
