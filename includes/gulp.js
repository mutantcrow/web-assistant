const execSync = require('child_process').execSync;
const path = require('path');

module.exports = (callbacks) => {
  callbacks.push(callback);
};

const callback = (answers) => {
  execSync(`gulp --gulpfile ${path.resolve(
      __dirname, '../configs/gulpfile.js')}`, {stdio: 'inherit'});
};
