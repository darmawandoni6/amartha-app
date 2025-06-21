import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { huskyAndCommitlint } from '../constants/husky-lint.js';
import { copyFile } from '../utils/copy-file.js';
import { runCommandWithBuilder } from '../utils/run-command.js';

const filesToCopy = [
  {
    src: path.join(__dirname, '../templates/husky/pre-commit'),
    dest: path.join('.husky', 'pre-commit'),
  },
  {
    src: path.join(__dirname, '../setup/next-js/.lintstagedrc.mjs'),
    dest: path.join(process.cwd(), '.lintstagedrc.mjs'),
  },
  {
    src: path.join(__dirname, '../setup/next-js/commitlint.config.ts'),
    dest: path.join(process.cwd(), 'commitlint.config.ts'),
  },
];

async function configureHuskyAndCommitlint(newInit = false) {
  if (!fs.existsSync('.git')) {
    throw new Error('Please init git');
  }

  if (fs.existsSync('.husky')) {
    throw new Error('Please Remove folder .husky');
  }
  if (!newInit) {
    await runCommandWithBuilder(`yarn add -D ${huskyAndCommitlint.join(' ')}`);
  }
  await runCommandWithBuilder('npx husky init');

  const targetPath = fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  const content = fs.readFileSync(templatePath, 'utf-8');
  fs.writeFileSync(targetPath, content, 'utf-8');

  const packageJsonPath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.scripts['pre-commit'] = 'lint-staged';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  filesToCopy.forEach(({ src, dest }) => {
    copyFile(src, dest);
  });
}

export default configureHuskyAndCommitlint;
