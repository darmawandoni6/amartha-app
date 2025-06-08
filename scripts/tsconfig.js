import fs from 'fs';

import { tsConfig } from '../constants/ts-config.js';

const setupTsConfig = async () => {
  const tsConfigPath = 'tsconfig.json';

  fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
};

export default setupTsConfig;
