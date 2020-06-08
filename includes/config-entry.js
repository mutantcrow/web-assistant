const fs = require('fs');
const chalk = require('chalk');

module.exports = () => {
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
};
