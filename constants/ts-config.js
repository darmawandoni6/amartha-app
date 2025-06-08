export const tsConfig = {
  compilerOptions: {
    lib: ['dom', 'dom.iterable', 'esnext'],
    allowJs: false,
    skipLibCheck: true,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    module: 'ESNext',
    moduleResolution: 'node',
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: 'preserve',
    incremental: true,
    baseUrl: './',
    paths: {
      '@public/*': ['public/*'],
      '@app/*': ['src/app/*'],
      '@assets/*': ['src/assets/*'],
      '@hooks/*': ['src/hooks/*'],
      '@modules/*': ['src/modules/*'],
      '@shared/*': ['src/shared/*'],
    },
    plugins: [
      {
        name: 'next',
      },
    ],
  },
  include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
  exclude: ['node_modules'],
};
