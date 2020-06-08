const fs = require('fs');
const chalk = require('chalk');

module.exports = (prompts, callbacks) => {
  callbacks.push(callback);
};

const callback = (answers, callbacks) => {
  if ( callbacks.length <= 1 ) {
    console.log(chalk.bold.yellow(' No configuration started. '));
  } else {
    console.log(chalk.bold.green(' Configuration completed. '));
  }
};
