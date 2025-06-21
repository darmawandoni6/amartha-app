import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const setupTsConfig = async () => {
  const src = path.join(__dirname, '../setup/next-js/tsconfig.json');
  const dest = path.join(process.cwd(), 'tsconfig.json');
  copyFile(src, dest);
};

export default setupTsConfig;
