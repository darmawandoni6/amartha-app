#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import shell from 'shelljs';

import { dependencies, devDependencies } from '../constants/dependencies.js';
import { huskyAndCommitlint } from '../constants/husky-lint.js';
import { schematics } from '../constants/semantic.js';
import configureBadge from '../scripts/badge-dev.js';
import configureEnvironment from '../scripts/environment.js';
import configureHuskyAndCommitlint from '../scripts/huskyCommitlint.js';
import initPackageJson from '../scripts/init-project.js';
import configureProjectDirectories from '../scripts/projectDirectories.js';
import centerText from '../utils/centerText.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';
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

async function askProjectDetails(projectName) {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'template',
        message: 'install template next-ts?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'git',
        message: 'Clone repository?',
        default: true,
      },
      {
        type: 'input',
        name: 'gitRepositoryUrl',
        message: 'Git clone:',
        when: answers => answers.git,
        default: 'git clone git@bitbucket.org:Amartha/{{project-name}}.git',
        validate: input => input.startsWith('git clone ') || 'Enter a valid GitHub repository URL!',
      },
    ]);

    return { projectName, ...answers };
  } catch (error) {
    if (error.isTtyError) {
      process.stdout.write('Prompt cannot be displayed on this terminal.');
    } else {
      process.stdout.write('\nProgram is stopped by user\n');
    }
    process.exit(0);
  }
}

async function createProject(projectName) {
  if (fs.existsSync(projectName)) {
    process.stdout.write(chalk.red('✖ ERROR : Project already exists') + `\n`);
    process.exit(1);
  }

  const details = await askProjectDetails(projectName);
  if (!details.template) {
    process.stdout.write(`\nCancel installation\n`);
  }
  process.stdout.write('\n');

  console.log(chalk.green('Installation in progress... ☕'));
  const spinner = ora();

  try {
    if (details.git) {
      await runCommandWithBuilder(`${details.gitRepositoryUrl} ${projectName}`);
    } else {
      shell.mkdir(projectName);
    }

    shell.cd(projectName);

    spinner.text = 'setup project...';
    spinner.start();
    await initPackageJson(projectName);
    spinner.succeed(chalk.green(`Success init Project 🎉 `));

    spinner.text = `install ${dependencies.join(' ')}`;
    spinner.start();
    await runCommandWithBuilder(`yarn add ${dependencies.join(' ')}`);
    spinner.succeed(chalk.green(`Success install dependencies 🎉`));

    spinner.text = `install ${devDependencies.join(' ')}`;
    spinner.start();
    await runCommandWithBuilder(`yarn add -D ${devDependencies.join(' ')}`);
    spinner.succeed(chalk.green(`Success install devDependencies 🎉`));

    await configureProjectDirectories();

    await configureBadge('src/shared/components/dev-version-badge');
    await configureEnvironment();

    if (details.git) {
      spinner.text = 'setup husky...';
      spinner.start();
      await runCommandWithBuilder(`npm init -y`);
      await configureHuskyAndCommitlint();
      spinner.succeed(chalk.green(`Success setup husky 🎉`));
    } else {
      spinner.text = 'sedikit lagi, tunggu sebentar...';
      spinner.start();
      await runCommandWithBuilder(`yarn add -D ${huskyAndCommitlint.join(' ')}`);
      spinner.succeed(chalk.green(`Success setup husky 🎉`));
    }

    spinner.succeed(chalk.green(`Project ${projectName} created! 🎉`));

    process.stdout.write(`\nNext steps:\n`);
    process.stdout.write(chalk.cyan(`\n$ cd ${projectName}`));
    process.stdout.write(chalk.cyan(`\n$ npm run dev\n`));

    process.stdout.write('\n\n');
    process.stdout.write(chalk.green(centerText('Thank you for using Express CLI!')) + '\n');
    process.stdout.write(chalk.yellow(centerText('Happy coding! 🚀')) + '\n\n');
  } catch (error) {
    spinner.fail(`Failed to create project: ${error.message}`);
    process.exit(1);
  }
}
