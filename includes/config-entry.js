const {readdirSync} = require('fs');
const chalk = require('chalk');
const {addLastSlash} = require('../utils');

module.exports = () => {
  prompts.next(
      {
        type: 'checkbox',
        name: 'entry',
        message: chalk.bold.yellow(' Select entry file(s): '),
        choices: readdirSync(process.cwd()),
        pageSize: 10,
        validate: (input) => input.length > 0,
      },
  );

  prompts.next(
      {
        type: 'confirm',
        name: 'useExternalModule',
        default: () => {
          if ('undefined' !== typeof packageJson.externalModulePath) {
            return true;
          }

          return false;
        },
        message: chalk.bold.yellow(
            ' Do you want to use external node_modules? '),
        validate: (input) => input.length > 0,
      },
  );

  prompts.next(
      {
        type: 'input',
        name: 'externalModulePath',
        message: chalk.bold.green(' Enter external node_modules path: '),
        default: () => {
          if ('undefined' !== typeof packageJson.externalModulePath) {
            return packageJson.externalModulePath;
          }

          return '../';
        },
        validate: (input) => input.length > 0,
        filter: (input) => addLastSlash(input),
        when: ({useExternalModule}) => {
          return useExternalModule;
        },
      },
  );

  callbacks.push(callback);
};

const callback = ({externalModulePath}) => {
  if (typeof externalModulePath !== 'undefined') {
    packageJson.externalModulePath = externalModulePath;
  }
};
