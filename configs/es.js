module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: [
    'rescale',
  ],
  rules: {
    // ECMAScript 6
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'arrow-spacing': 2,
    'generator-star-spacing': 0,
    'no-confusing-arrow': 0,
    'no-duplicate-imports ': 0,
    'no-restricted-imports': 0,
    'no-this-before-super': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-rename': 2,
    'no-var': 2,
    'object-shorthand': [2, 'always'],
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'prefer-destructuring': [2, { array: false, object: true }], // TODO: disable for assignments https://github.com/eslint/eslint/issues/7886
    'prefer-numeric-literals': 2,
    'prefer-rest-params': 2,
    'prefer-spread': 2,
    'rest-spread-spacing': 2,
    'sort-imports': 0,
    'symbol-description': 0,
    'template-curly-spacing': 2,
    'yield-star-spacing': 0,

    'rescale/comma-dangle-functions': [2, { callee: ['cx', 'of'] }],
  },
};
