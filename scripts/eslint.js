import fs from 'fs';

import { eslintDependencies } from '../constants/eslint.js';
import templateCodeEslint from '../templates/eslint.js';
import { runCommandWithBuilder } from '../utils/runCommandWithBuilder.js';

const configureEslint = async () => {
  // await runCommandWithBuilder(`yarn add -D ${eslintDependencies.join(' ')}`);

  const configPath = '.eslintrc.js';
  if (!fs.existsSync(configPath)) {
    const configContent = templateCodeEslint();

    fs.writeFileSync(configPath, configContent, 'utf8');
  }
};

export default configureEslint;
