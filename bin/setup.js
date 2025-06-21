import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';

import { listSetup } from '../constants/setup.js';
import configureHuskyAndCommitlint from '../scripts/husky-commit-lint.js';
import jestSetup from '../scripts/jest.js';
import configurePrettier from '../scripts/prettier.js';
import centerText from '../utils/center-text.js';

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
    if (!q.confirm) {
      throw new Error(`Cancel setup project ${q.setup}`);
    }
    if (!fs.existsSync('package.json')) {
      throw new Error('Please init project');
    }

    spinner.text = `setup ${q.setup}...`;
    spinner.start();
    switch (q.setup) {
      case listSetup.husky:
        await configureHuskyAndCommitlint(true);
        break;
      case listSetup.jest:
        await jestSetup();
        break;
      case listSetup.prettier:
        await configurePrettier();
        break;
      case listSetup.eslint:
        await configurePrettier();
        break;
      default:
        break;
    }
    spinner.succeed(chalk.green(`Success init ${q.setup} 🎉`));

    if (q.setup === 'jest') {
      process.stdout.write(`\nNext steps:\n`);
      process.stdout.write(chalk.cyan(`\n$ Open File jest.config.ts\n`));
      process.stdout.write(chalk.cyan(`\n$ update moduleNameMapper\n`));
      process.stdout.write(chalk.cyan(`\n$ example: \n moduleNameMapper: { '^@app/(.*)$': '<rootDir>/src/app/$1' }\n`));
    }
    process.stdout.write('\n\n');
    process.stdout.write(chalk.yellow(centerText('Happy coding! 🚀')) + '\n\n');
  } catch (error) {
    spinner.fail(`Failed to generate project: ${error.message}`);
    process.exit(1);
  }
};
