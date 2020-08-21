#! /usr/bin/env node
const inquirer = require('inquirer');
const rx = require('rxjs');

global.prompts = new rx.Subject();
global.callbacks = [];
global.packageJson = {private: true, entry: {}, scripts: {}};

try {
  global.cachedPackageJson = require(process.cwd() + '/package.json');
} catch (error) {
  global.cachedPackageJson = packageJson;
}

inquirer.prompt(prompts)
    .then((answers) => callbacks.forEach(
        (callback) => callback(answers)));

require('./prompts/prompt-entry');
require('./prompts/prompt-javascript');
require('./prompts/prompt-sass');
require('./prompts/prompt-output');

prompts.complete();
