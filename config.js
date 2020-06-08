#! /usr/bin/env node
const inquirer = require('inquirer');
const rx = require('rxjs');
const entry = require('./includes/config-entry');
const typescript = require('./includes/config-typescript');
const sass = require('./includes/config-sass');
const output = require('./includes/config-output');

const prompts = new rx.Subject();
const callbacks = [];

inquirer.prompt(prompts)
    .then((answers) => callbacks.forEach(
        (callback) => callback(answers, callbacks)));

entry(prompts, callbacks);
typescript(prompts, callbacks);
sass(prompts, callbacks);
output(prompts, callbacks);

prompts.complete();
