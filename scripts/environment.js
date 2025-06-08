import fs from 'fs';

import templateCodeEnvironmentVariable from '../templates/environment.js';
import templateGlobalFile from '../templates/global.js';

const configureEnvironment = async () => {
  const environmentVariables = {
    local: '.env.local',
    development: '.env.development',
    staging: '.env.staging',
    production: '.env.production',
  };

  const environmentVariableContent = environment => templateCodeEnvironmentVariable(environment);

  Object.entries(environmentVariables).forEach(([environment, fileName]) => {
    const content = environmentVariableContent(environment);
    fs.writeFileSync(fileName, content);
  });

  const envConfigPath = `src/shared/types/global.d.ts`;

  const envConfigContent = templateGlobalFile();

  fs.mkdirSync('src/shared/types', { recursive: true });
  fs.writeFileSync(envConfigPath, envConfigContent);
};

export default configureEnvironment;
