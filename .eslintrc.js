const config = {
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin: import/warnings',
    'plugin: import/typescript',
    'plugin: @typescript-eslint/recommended',
    'prettier',
  ],
  rule: {
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(use.*Ref$)',
      },
    ],
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};

export default config;
