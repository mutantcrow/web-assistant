const {writeFileSync} = require('fs');
const {resolve} = require('path');
const {addLastSlash} = require('../utils');
const chalk = require('chalk');

prompts.next(
    {
      type: 'confirm',
      name: 'useExternalModule',
      default: () => {
        if ('undefined' !== typeof cachedPackageJson.externalModulesPath) {
          return true;
        }

        return false;
      },
      message: chalk.green(
          'Do you want to use external node_modules? '),
      validate: (input) => input.length > 0,
      when: () => callbacks.length > 2,
    },
);

prompts.next(
    {
      type: 'input',
      name: 'externalModulesPath',
      message: chalk.green('Enter external node_modules path: '),
      default: () => {
        if ('undefined' !== typeof cachedPackageJson.externalModulesPath) {
          return cachedPackageJson.externalModulesPath;
        }

        return '../';
      },
      validate: (input) => input.length > 0,
      filter: (input) => addLastSlash(input),
      when: ({useExternalModule}) => {
        return useExternalModule;
      },
    },
);

callbacks.push(
    ({externalModulesPath}) => {
      if ('undefined' !== typeof externalModulesPath ) {
        packageJson.externalModulesPath = externalModulesPath;
      }
    },
);

callbacks.push(
    ({solutionName}) => {
      if ( callbacks.length === 2 ) {
        console.log(chalk.red(
            '[!] Error: Entry is not valid.'));
        return;
      }

      console.log(chalk.blue('[i] Info: Configuration is successfull. '));

      if ( 'undefined' !== typeof solutionName ) {
        packageJson.solutionName = solutionName;

        for ( const type in packageJson.entry ) {
          if (packageJson.entry.hasOwnProperty(type)) {
            packageJson.scripts[`start:${solutionName}-type-${type}`] =
              `wa-worker ${type}`;
            packageJson.scripts[`build:${solutionName}-type-${type}`] =
              `wa-worker-prod ${type}`;

            packageJson.entry[type].files.forEach((file) => {
              packageJson.scripts[`start:${file}`] =
              `wa-worker ${type} ${file}`;
              packageJson.scripts[`build:${file}`] =
                `wa-worker-prod ${type} ${file}`;
            });
          }
        }

        packageJson.scripts['start:' + solutionName + '-solution'] =
        'wa-worker';
        packageJson.scripts['build:' + solutionName + '-solution'] =
          'wa-worker-prod';
      } else {
        packageJson.scripts['start'] = 'wa-worker';
        packageJson.scripts['build'] = 'wa-worker-prod';
      }

      writeFileSync(
          resolve(process.cwd(), 'package.json'),
          JSON.stringify(packageJson, null, 2));
    },
);
