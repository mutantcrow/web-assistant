const chalk = require('chalk');

module.exports = (packageJson, callbacks) => {
  if (typeof packageJson.entry.scss !== 'undefined') {
    callbacks.push(callback);
  }
};

const callback = (cb) => {
  console.log(chalk.bgMagenta(' SASS compiling completed. '));
  cb();
};
