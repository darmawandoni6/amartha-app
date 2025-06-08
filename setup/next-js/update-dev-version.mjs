import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.join(__dirname, 'package.json');

const readJsonFile = filePath => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
};

const runGitCommand = command => {
  try {
    return execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
};

const updateDevVersion = () => {
  const packageJson = readJsonFile(packageJsonPath);
  const prodVersion = packageJson.version;
  packageJson.development = packageJson.development || {};

  let devVersion = packageJson.development.version;
  const prevVersion = packageJson.development.version.split('+');

  if (prevVersion[0] !== prodVersion) {
    devVersion = `${prodVersion}+dev.0`;
  }

  const [base, devSuffix] = devVersion.split('+');
  const [env, num] = devSuffix.split('.');
  const newDevVersion = `${base}+${env}.${parseInt(num, 10) + 1}`;

  packageJson.development.version = newDevVersion;
  writeJsonFile(packageJsonPath, packageJson);

  console.log(`Updated DEV version: ${newDevVersion}`);
  return newDevVersion;
};

const main = () => {
  const newDevVersion = updateDevVersion();

  console.log('Staging changes...');
  runGitCommand('git add package.json');

  console.log('Committing changes...');
  runGitCommand(`git commit -m "chore(development): ${newDevVersion} [skip ci]"`);

  console.log('Pushing changes to the repository...');
  runGitCommand('git push');

  console.log('Version update and push completed successfully!');
};

main();
