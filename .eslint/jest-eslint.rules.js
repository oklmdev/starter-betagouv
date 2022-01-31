module.exports = {
  'jest/consistent-test-it': 'error',
  'jest/max-nested-describe': [
    'error',
    {
      max: 2,
    },
  ],
  'jest/no-alias-methods': 'error',
  'jest/no-duplicate-hooks': 'error',
  'jest/no-hooks': [
    'error',
    {
      allow: ['beforeEach', 'afterEach'],
    },
  ],
  'jest/no-if': 'error',
  'jest/no-large-snapshots': ['error', { maxSize: 12, inlineMaxSize: 6 }],
  'jest/no-test-return-statement': 'error',
  'jest/prefer-called-with': 'error',
  'jest/prefer-hooks-on-top': 'error',
  'jest/prefer-lowercase-title': [
    'error',
    {
      ignoreTopLevelDescribe: true,
    },
  ],
  'jest/prefer-spy-on': 'error',
  'jest/prefer-strict-equal': 'error',
  'jest/prefer-to-be': 'error',
  'jest/prefer-to-contain': 'error',
  'jest/prefer-to-have-length': 'error',
  'jest/prefer-todo': 'error',
  'jest/require-hook': 'error',
  'jest/require-to-throw-message': 'error',
  'jest/require-top-level-describe': 'error',
};
