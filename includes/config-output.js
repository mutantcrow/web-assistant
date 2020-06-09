const {writeFileSync} = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = () => {
  callbacks.push(callback);
};

const callback = () => {
  if ( callbacks.length <= 1 ) {
    console.log(chalk.bold.yellow(' No configuration started. '));
    return;
  }

  console.log(chalk.bold.green(' Configuration completed. '));

  packageJson.scripts = {
    start: 'waw',
    build: 'waw production',
  };

  packageJson.private = true;

  writeFileSync(
      path.resolve(process.cwd(), 'package.json'),
      JSON.stringify(packageJson));
};
