import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { copySetup } from '../utils/copy-file.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = path.join(__dirname, '../setup/src-directories');

const configureDirectories = async () => {
  await copySetup(templatePath, 'src');
};

export default configureDirectories;
