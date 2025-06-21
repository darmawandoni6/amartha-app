import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import shell from 'shelljs';

import configureDirectories from '../scripts/directories.js';
import configureEnvironment from '../scripts/environment.js';
import configureHuskyAndCommitlint from '../scripts/husky-commit-lint.js';
import { nextTS } from '../scripts/next-ts.js';
import { runCommandWithBuilder } from '../utils/run-command.js';

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

export async function initProject(projectName) {
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
    // install with have not husky
    await nextTS(projectName);
    await configureDirectories();
    await configureEnvironment();
    spinner.succeed(chalk.green(`Setup project ${projectName} success! 🎉`));

    if (details.git) {
      await configureHuskyAndCommitlint(false);
    }

    spinner.text = 'install all dependencies...';
    spinner.start();
    await runCommandWithBuilder('yarn install');
    spinner.succeed(chalk.green(`install dependencies success! 🎉`));

    process.stdout.write(`\nNext steps:\n`);
    process.stdout.write(chalk.cyan(`\n$ cd ${projectName}`));
    process.stdout.write(chalk.cyan(`\n$ yarn dev\n`));

    process.stdout.write('\n\n');
    process.stdout.write(chalk.green(centerText('Thank you for using amartha-app CLI!')) + '\n');
    process.stdout.write(chalk.yellow(centerText('Happy coding! 🚀')) + '\n\n');
  } catch (error) {
    spinner.fail(`Failed to create project: ${error.message}`);
    process.exit(1);
  }
}
