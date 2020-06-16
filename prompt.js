#! /usr/bin/env node
const inquirer = require('inquirer');
const rx = require('rxjs');
const entry = require('./prompts/prompt-entry');
const typescript = require('./prompts/prompt-typescript');
const sass = require('./prompts/prompt-sass');
const output = require('./prompts/prompt-output');

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
