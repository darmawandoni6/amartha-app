import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';

import { listSetup } from '../constants/setup.js';
import configureHuskyAndCommitlint from '../scripts/huskyCommitlint.js';

const askProjectSetup = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'setup',
        message: 'Select config:',
        choices: Object.keys(listSetup),
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: `Setup project ?`,
        default: true,
      },
    ]);
    return answers;
  } catch (error) {
    if (error.isTtyError) {
      process.stdout.write('Prompt cannot be displayed on this terminal.');
    } else {
      process.stdout.write('\nProgram is stopped by user\n');
    }
    process.exit(0);
  }
};
export const setupConfig = async () => {
  const spinner = ora();

  try {
    const q = await askProjectSetup();

    switch (q.setup) {
      case listSetup.husky:
        spinner.text = 'setup husky...';
        spinner.start();
        if (!fs.existsSync('.git')) {
          throw new Error('Please init git');
        }
        if (!fs.existsSync('package.json')) {
          throw new Error('Please init project');
        }
        await configureHuskyAndCommitlint(true);
        break;

      default:
        break;
    }
    spinner.succeed(chalk.green(`Success init ${q.setup} 🎉`));
  } catch (error) {
    spinner.fail(`Failed to generate project: ${error.message}`);
    process.exit(1);
  }
};
