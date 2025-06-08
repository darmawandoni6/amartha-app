import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { huskyAndCommitlint } from '../constants/husky-lint.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = path.join(__dirname, '../constants/pre-commit');

async function configureHuskyAndCommitlint() {
  if (fs.existsSync('.husky')) {
    throw new Error('Please Remove folder .husky');
  }
  await runCommandWithBuilder(`yarn add -D ${huskyAndCommitlint.join(' ')}`);
  await runCommandWithBuilder('npx husky init');

  const targetPath = path.join('.husky', 'pre-commit');
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  const content = fs.readFileSync(templatePath, 'utf-8');
  fs.writeFileSync(targetPath, content, 'utf-8');
}

export default configureHuskyAndCommitlint;
