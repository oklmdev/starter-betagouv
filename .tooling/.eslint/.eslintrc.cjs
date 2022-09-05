// Lint the files included in each typescript project with common rules
const projects = ['./../../tsconfig.json'];
// Lint project using its tsconfig.json.
const lintProjects = () => {
  return [
    {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        //'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier'
      ],
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: projects,
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/prefer-as-const': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'off'
        //...require('./eslint.rules.cjs')
        //...require("./typescript-eslint.rules.cjs"),
      }
    }
  ];
};

// Attention: Declaration order has importance as rules apply in cascade.
const lintProjectsWithoutTests = () => {
  return [...lintProjects()];
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  overrides: [...lintProjectsWithoutTests()]
};
