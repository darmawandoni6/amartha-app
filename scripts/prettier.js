import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { prettierDependencies } from '../constants/prettier.js';
import { copyFile } from '../utils/copy-file.js';
import { runCommandWithBuilder } from '../utils/run-command.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const configurePrettier = async () => {
  await runCommandWithBuilder(`yarn add -D ${prettierDependencies.join(' ')}`);

  const src = path.join(__dirname, '../setup/next-js/.prettierrc');
  const dest = path.join(process.cwd(), '.prettierrc');
  copyFile(src, dest);
};

export default configurePrettier;
