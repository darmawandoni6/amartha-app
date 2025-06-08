import fs from 'fs';
import path from 'path';

import { srcFolder } from '../constants/srcFolder.js';
import templateMiddleware from '../templates/middleware.js';

const configureProjectDirectories = async () => {
  const folders = new Set(srcFolder);

  const srcPath = 'src';
  if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath);
  }

  folders.forEach(folder => {
    const folderPath = path.join(srcPath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  });

  const middlewareFilePath = path.join(srcPath, 'middleware.ts');

  const middlewareContent = templateMiddleware();

  if (!fs.existsSync(middlewareFilePath && middlewareContent)) {
    fs.writeFileSync(middlewareFilePath, middlewareContent);
  }
};

export default configureProjectDirectories;
