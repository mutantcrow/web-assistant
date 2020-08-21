const {readdirSync} = require('fs');
const chalk = require('chalk');

prompts.next(
    {
      type: 'checkbox',
      name: 'entry',
      message: chalk.green(' Select entry file(s): '),
      choices: readdirSync(process.cwd()),
      pageSize: 10,
      validate: (input) => {
        if (input.length < 1) {
          return chalk.yellow( '[?] Warning: Please select a file');
        }

        return true;
      },
    },
);

prompts.next(
    {
      type: 'input',
      name: 'solutionName',
      default: () => {
        if ('undefined' !== typeof cachedPackageJson.solutionName) {
          return cachedPackageJson.solutionName;
        }

        return;
      },
      message: chalk.green(
          'Enter a solution name for multiple entries: '),
      validate: (input) => input.length > 0,
      when: ({entry}) => entry.length > 1,
    },
);

