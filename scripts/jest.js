import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { jesDependencies } from '../constants/jest.js';
import { copyFile } from '../utils/copy-file.js';
import { runCommandWithBuilder } from '../utils/run-command.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const filesToCopy = [
  {
    src: path.join(__dirname, '../setup/next-js/jest.config.ts'),
    dest: path.join(process.cwd(), 'jest.config.ts'),
  },
  {
    src: path.join(__dirname, '../setup/next-js/jest.setup.ts'),
    dest: path.join(process.cwd(), 'jest.setup.ts'),
  },
];

const jestSetup = async () => {
  await runCommandWithBuilder(`yarn add -D ${jesDependencies.join(' ')}`);
  filesToCopy.forEach(({ src, dest }) => {
    copyFile(src, dest);
  });

  const packageJsonPath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.scripts['test'] = 'jest --changedSince=origin/main --coverage';
  packageJson.scripts['test-coverage'] = 'jest --coverage';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  const moduleNameMapper = 'jest.config.ts';
  const source = fs.readFileSync(moduleNameMapper, 'utf8');

  const updated = source.replace(/moduleNameMapper:\s*{[^}]*}/s, `moduleNameMapper: {}`);

  fs.writeFileSync(moduleNameMapper, updated);
};

export default jestSetup;
