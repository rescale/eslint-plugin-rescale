module.exports = {
  extends: [ 'plugin:@typescript-eslint/recommended' ],
  rules: {
    // already covered by base
    '@typescript-eslint/indent': 'ignore',
    // should be enabled when we normalize on `import`
    '@typescript-eslint/no-var-requires': 'ignore',
    // should be enabled (IMO) but many components rely on `function` hoisting
    '@typescript-eslint/no-use-before-define': 'ignore',
    // could be enabled easily, many components destructure bits they don't actually need out of props or state
    '@typescript-eslint/no-unused-vars': 'ignore',
    '@typescript-eslint/explicit-member-accessibility': [ 'no-public', 'error' ],
    '@typescript-eslint/camelcase': 'ignore',
  }
};
