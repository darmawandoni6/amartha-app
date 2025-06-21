import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { copySetup } from '../utils/copy-file.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = path.join(__dirname, '../setup/next-js');

export const nextTS = async projectName => {
  await copySetup(templatePath, '.');
  const filePath = 'package.json';

  const packageJsonPath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.name = projectName;
  packageJson.version = '0.0.1';
  packageJson.description = `This is a ${projectName} project`;
  packageJson.development = {
    version: '0.0.1+dev.0',
  };
  fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
};
