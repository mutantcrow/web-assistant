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

  console.log(chalk.bold.inverse(' Configuration process ended. '));

  packageJson.scripts = {
    start: 'wa-worker',
    build: 'wa-worker prod',
  };

  packageJson.private = true;

  writeFileSync(
      path.resolve(process.cwd(), 'package.json'),
      JSON.stringify(packageJson));
};
