const chalk = require('chalk');

module.exports = (packageJson, callbacks) => {
  if (typeof packageJson.entry.ts !== 'undefined') {
    callbacks.push(callback);
  }
};

const callback = (cb) => {
  console.log(chalk.bgBlue(' Typescript compiling completed. '));
  cb();
};
