import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = path.join(__dirname, '../setup/dev-version-badge');

const configureBadge = async currentDir => {
  const filesToCreate = fs.readdirSync(templatePath);

  for (const file of filesToCreate) {
    const origFilePath = path.join(templatePath, file);
    const targetPath = path.join(currentDir, file);
    const stats = fs.statSync(origFilePath);
    if (stats.isFile()) {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(origFilePath, targetPath);
    }
  }
};

export default configureBadge;
