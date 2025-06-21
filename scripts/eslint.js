import fs from 'fs';
import path, { dirname } from 'path';

import { eslintDependencies } from '../constants/eslint.js';
import { runCommandWithBuilder } from '../utils/run-command.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const configureEslint = async () => {
  await runCommandWithBuilder(`yarn add -D ${eslintDependencies.join(' ')}`);

  const configPath = '.eslintrc';

  const src = path.join(__dirname, '../setup/next-js/.eslintrc');
  const dest = path.join(process.cwd(), configPath);

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const content = fs.readFileSync(src, 'utf-8');
  fs.writeFileSync(dest, content, 'utf-8');
};

export default configureEslint;
