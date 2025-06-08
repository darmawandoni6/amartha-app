import * as fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { packageScript } from '../constants/package.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = path.join(__dirname, '../setup/next-js');

const setupProject = (templatePath, currentDir) => {
  const filesToCreate = fs.readdirSync(templatePath);

  for (const file of filesToCreate) {
    const origFilePath = path.join(templatePath, file);
    const targetPath = path.join(currentDir, file);
    const stats = fs.statSync(origFilePath);

    if (stats.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      setupProject(origFilePath, targetPath);
    } else {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(origFilePath, targetPath);
    }
  }
};

async function initPackageJson(projectName) {
  const filePath = 'package.json';
  packageScript.name = projectName;
  packageScript.description = `This is a ${projectName} project`;
  fs.writeFileSync(filePath, JSON.stringify(packageScript, null, 2));

  setupProject(templatePath, '.');
}

export default initPackageJson;
