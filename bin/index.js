#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';

import { schematics } from '../constants/semantic.js';
import { createProject } from '../scripts/init-project.js';
import { actionInfo } from './info.js';
import { setupConfig } from './setup.js';
import { updateVersion } from './update.js';

const dim = '\x1b[2m';
const reset = '\x1b[0m';

const program = new Command();
const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

program.command('new <project-name>').description('Create a new template project').action(createProject);
program.option('-i, --info', `Display information about ${packageJson.name}`).action(() => actionInfo(packageJson));
program.on('--help', () => {
  process.stdout.write('\nSchematics:\n');
  Object.keys(schematics).forEach(schematic => {
    process.stdout.write(`  ${schematic} ${dim} \t${schematics[schematic]} ${reset}\n`);
  });
});

program
  .command('update')
  .description(`Update ${packageJson.name} to the latest version`)
  .action(() => updateVersion(packageJson));
program.version(packageJson.version, '-v, --version', `Display the current version of ${packageJson.name}`);

program.command('setup').description('setup a new config').action(setupConfig);

program.parse(process.argv);
