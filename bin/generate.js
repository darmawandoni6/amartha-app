import chalk from 'chalk';
import ora from 'ora';

import { schematicName, schematics } from '../constants/semantic.js';
import { generateModule } from '../scripts/module.js';

export const generateAction = async (schematic, module, fileName) => {
  const spinner = ora();

  try {
    if (!schematics[schematic]) {
      throw new Error(`missing schematic ${schematic}`);
    }
    console.log(chalk.green('Installation in progress... ☕'));
    switch (schematic) {
      case schematicName.module:
        spinner.start();
        await generateModule(module, fileName);
        break;

      default:
        break;
    }

    spinner.succeed('Process success! 🎉');
  } catch (error) {
    spinner.fail(`Failed to generate project: ${error.message}`);
    process.exit(1);
  }
};
