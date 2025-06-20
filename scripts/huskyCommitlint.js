import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { huskyAndCommitlint } from '../constants/husky-lint.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const templatePath = path.join(__dirname, '../constants/pre-commit');
const lintstagedrc = path.join(__dirname, '../setup/next-js/.lintstagedrc.mjs');

async function configureHuskyAndCommitlint(file) {
  if (fs.existsSync('.husky')) {
    throw new Error('Please Remove folder .husky');
  }
  await runCommandWithBuilder(`yarn add -D ${huskyAndCommitlint.join(' ')}`);
  await runCommandWithBuilder('npx husky init');

  const targetPath = path.join('.husky', 'pre-commit');
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  const content = fs.readFileSync(templatePath, 'utf-8');
  fs.writeFileSync(targetPath, content, 'utf-8');

  if (file) {
    const packageJsonPath = 'package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.scripts['pre-commit'] = 'lint-staged';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const targetPath = path.join(process.cwd(), '.lintstagedrc.mjs');
    fs.copyFile(lintstagedrc, targetPath, err => {
      if (err) {
        throw ('❌ Failed to generate project:', err);
      }
    });
  }
}

export default configureHuskyAndCommitlint;
