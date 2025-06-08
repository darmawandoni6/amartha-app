import fs from 'fs';

import templateCodeGitIgnore from '../templates/git-ignore.js';

const configureGitIgnore = async () => {
  const gitignore = '.gitignore';
  const newIgnoreRules = templateCodeGitIgnore();
  fs.writeFileSync(gitignore, newIgnoreRules);
};

export default configureGitIgnore;
