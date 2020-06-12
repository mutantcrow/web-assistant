#! /usr/bin/env node
const inquirer = require('inquirer');
const rx = require('rxjs');
const entry = require('./includes/config-entry');
const typescript = require('./includes/config-typescript');
const sass = require('./includes/config-sass');
const output = require('./includes/config-output');

global.prompts = new rx.Subject();
global.callbacks = [];

global.packageJson = {entry: {}, output: {}};

try {
  global.cachedPackageJson = require(process.cwd() + '/package.json');
} catch (error) {
  global.cachedPackageJson = packageJson;
}

inquirer.prompt(prompts)
    .then((answers) => callbacks.forEach(
        (callback) => callback(answers)));

entry();
typescript();
sass();
output();

prompts.complete();
