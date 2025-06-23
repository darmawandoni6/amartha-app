import fs from 'fs';
import path from 'path';
import shell from 'shelljs';

function createFile(baseDir, filePath) {
  const fullPath = path.join(baseDir, filePath);
  const dir = path.dirname(fullPath);

  // Buat folder jika belum ada
  fs.mkdirSync(dir, { recursive: true });

  // Buat file kosong kalau belum ada
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, '');
    console.log('📄 Created:', fullPath);
  } else {
    console.log('⚠️  File exists:', fullPath);
  }
}

function generateContainer(fileName) {
  const name = fileName.charAt(0).toUpperCase() + fileName.slice(1) + 'Container';
  return `
const ${name} = () => {
  return <div></div>;
};

export default ${name};
  `;
}

export const generateModule = async (module, fileName) => {
  if (!fs.existsSync('package.json')) {
    throw new Error('Please generate in root directory!!');
  }

  if (!module.includes('/')) {
    throw new Error(`format salah, 'amartha-web -h'`);
  }
  const [bu, feat] = module.split('/');
  const newFolder = 'src/modules/' + bu;
  const targetPath = path.join(process.cwd(), newFolder);
  fs.mkdirSync(targetPath, { recursive: true });

  shell.cd('src/modules');

  const baseDir = path.join(bu, feat);

  const structure = {
    domain: [`types-${fileName}.ts`],
    infrastructure: [`api/${fileName}-api.ts`, `mappers/${fileName}-data-mappers.ts`],
    ui: [`containers/${feat}/${fileName}-container.tsx`],
  };
  Object.entries(structure).forEach(([folder, files]) => {
    files.forEach(file => {
      createFile(baseDir, path.join(folder, file));
    });
  });
  const fileTemplate = generateContainer(fileName);

  const filePath = `${module}/ui/` + structure.ui[0];
  fs.mkdirSync(`${module}/ui/containers/${feat}`, { recursive: true });
  fs.writeFileSync(filePath, fileTemplate);
};
