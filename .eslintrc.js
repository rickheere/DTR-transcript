module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    'cypress/globals': true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: true,
      },
    ],
  },
  plugins: ['cypress', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],

      parserOptions: {
        ecmaFeatures: { jsx: true },
      },

      rules: {
        // Prevent TypeScript-specific constructs from being erroneously flagged as unused
        '@typescript-eslint/no-unused-vars': 'error',
        // Require PascalCased class and interface names
        '@typescript-eslint/class-name-casing': 'error',
        // Require a specific member delimiter style for interfaces and type literals
        // Default Semicolon style
        // '@typescript-eslint/member-delimiter-style': 'error',
        // Require a consistent member declaration order
        '@typescript-eslint/member-ordering': 'error',
        // Require consistent spacing around type annotations
        '@typescript-eslint/type-annotation-spacing': 'error',
      },
    },
  ],
};
