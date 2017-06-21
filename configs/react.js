module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'rescale',
  ],
  rules: {
    'react/jsx-closing-bracket-location': [2, { location: 'tag-aligned' }],
    'react/jsx-closing-tag-location': 2,
    'react/jsx-curly-spacing': [2, 'never'],
    'react/jsx-equals-spacing': 2,
    'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
    'react/jsx-indent': [2, 2],
    'react/jsx-max-props-per-line': [2, { when: 'multiline' }],
    'react/jsx-no-undef': 2,
    'react/jsx-tag-spacing': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-wrap-multilines': [2, { arrow: false }],
    'react/no-deprecated': 2,
    'react/no-is-mounted': 2,
    'react/no-unknown-property': 2,
    'react/react-in-jsx-scope': 2,
    'react/self-closing-comp': 2,
    'react/sort-comp': [2, { groups: { render: ['/^render.*$/'] } }],

    'rescale/jsx-bracket-spacing': 2,
    'rescale/jsx-sort-props': 2,
    'rescale/react-lifecycle-argument-names': 2,
  },
};
