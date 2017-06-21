exports.configs = {
  base: require('./configs/base'),
  browser: require('./configs/browser'),
  es: require('./configs/es'),
  node: require('./configs/node'),
  react: require('./configs/react'),
};

exports.rules = {
  'comma-dangle-functions': require('./rules/comma-dangle-functions'),
  'jsx-bracket-spacing': require('./rules/jsx-bracket-spacing'),
  'jsx-sort-props': require('./rules/jsx-sort-props'),
  'react-lifecycle-argument-names': require('./rules/react-lifecycle-argument-names'),
};
