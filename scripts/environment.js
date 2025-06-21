import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { copyFile, copySetup } from '../utils/copy-file.js';
import { runCommandWithBuilder } from '../utils/run-command.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const configureEnvironment = async (initProject = true) => {
  const filesToCopy = [];
  const env = ['.env.dev', '.env.local', '.env.production', '.env.uat'];
  env.forEach(element => {
    filesToCopy.push({
      src: path.join(__dirname, `../templates/environment/${element}`),
      dest: path.join(process.cwd(), element),
    });
  });
  filesToCopy.forEach(element => {
    copyFile(element.src, element.dest);
  });

  const src = path.join(__dirname, '../templates/environment/src');
  copySetup(src, 'src');
  if (!initProject) {
    await runCommandWithBuilder('yarn add -D env-cmd');
  }
};

export default configureEnvironment;
