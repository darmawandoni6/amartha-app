#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';

import { schematics } from '../constants/semantic.js';
import { actionInfo } from './info.js';
import { initProject } from './init-project.js';
import { setupConfig } from './setup.js';
import { updateVersion } from './update.js';

const dim = '\x1b[2m';
const reset = '\x1b[0m';

const program = new Command();
const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

// init new project
program.command('new <project-name>').description('Create a new template project').action(initProject);

// information cli
program.option('-i, --info', `Display information about ${packageJson.name}`).action(() => actionInfo(packageJson));

// help information
program.on('--help', () => {
  process.stdout.write('\nSchematics:\n');
  Object.entries(schematics).forEach(([schematic, desc]) => {
    let text = `  ${schematic} ${dim} \t${desc} ${reset}\n`;
    if (schematic.length <= 3) {
      text = `  ${schematic} ${dim} \t\t${desc} ${reset}\n`;
    }
    process.stdout.write(text);
  });
});

// update cli to latest
program
  .command('update')
  .description(`Update ${packageJson.name} to the latest version`)
  .action(() => updateVersion(packageJson));

// setup utilities
program.command('setup').description('setup a new configuration').action(setupConfig);

// generate based on schematic
program.command('generate <schematic> <file-name>').description('Generate a new file based on a schematic');

// version cli
program.version(packageJson.version, '-v, --version', `Display the current version of ${packageJson.name}`);

program.parse(process.argv);
