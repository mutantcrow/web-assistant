#! /usr/bin/env node
const inquirer = require('inquirer');
const rx = require('rxjs');
const entry = require('./includes/entry');
const typescript = require('./includes/typescript');
const sass = require('./includes/sass');

const prompts = new rx.Subject();
const callbacks = [];

inquirer.prompt(prompts)
    .then((answers) => callbacks.forEach(
        (callback) => callback(answers, callbacks)));

entry(prompts, callbacks);
typescript(prompts, callbacks);
sass(prompts, callbacks);

prompts.complete();
