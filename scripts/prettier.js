import fs from 'fs';
import shell from 'shelljs';

import { configPrettier } from '../constants/prettier.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const configurePrettier = async () => {
  // await runCommandWithBuilder('yarn add -D prettier @trivago/prettier-plugin-sort-imports');
  fs.writeFileSync('.prettierrc', JSON.stringify(configPrettier, null, 2));
};

export default configurePrettier;
