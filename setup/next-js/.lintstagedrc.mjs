import path from 'path';

const buildEslintCommand = filenames =>
  `next lint --fix --file ${filenames.map(f => path.relative(process.cwd(), f).replace(/\\/g, '/')).join(' --file ')}`;

const configs = {
  '*.{ts,tsx}': filenames => {
    const eslintCommand = buildEslintCommand(filenames);

    return ['yarn type-check', eslintCommand, `jest --findRelatedTests ${filenames.join(' ')} --passWithNoTests`];
  },
};

export default configs;
