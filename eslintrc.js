module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  overrides: [
    {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
      ],
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        ...require('./.eslint/eslint.rules'),
        ...require('./.eslint/typescript-eslint.rules'),
      },
    },
    {
      env: {
        'jest/globals': true,
      },
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      files: ['**/*.spec.ts'],
      plugins: ['jest'],
      rules: {
        ...require('./.eslint/eslint-test.rules'),
        ...require('./.eslint/jest-eslint.rules'),
        ...require('./.eslint/typescript-eslint-test.rules'),
      },
    },
  ],
};
