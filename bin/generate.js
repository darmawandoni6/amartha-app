import ora from 'ora';

import { schematics } from '../constants/semantic';

export const setupConfig = async () => {
  const spinner = ora();

  try {
    const keys = Object.keys(schematics);
    if (!keys[schematic]) {
      throw new Error(`missing schematic ${schematic}`);
    }

    switch (schematic) {
      case 'husky':
        break;

      default:
        break;
    }
  } catch (error) {
    spinner.fail(`Failed to generate project: ${error.message}`);
    process.exit(1);
  }
};
