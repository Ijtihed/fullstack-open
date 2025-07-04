export default [
  import('@eslint/js').then(m => m.configs.recommended),
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs', ecmaVersion: 'latest' },
    plugins: { '@stylistic/js': await import('@stylistic/eslint-plugin-js') },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
    ignores: ['dist/**'],
  },
] 