/**
 * The goal of this rule is consistency.
 *
 * React lifecycle hook arguments are pretty well documented:
 * https://facebook.github.io/react/docs/react-component.html
 *
 * The names of each of the hook's arguments should match the ones written in
 * the docs for consistency and searchability.
 */
module.exports = {
  meta: {
    fixable: 'code',
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    const checkedMethods = {
      componentDidMount: ['prevProps', 'prevState'],
      componentWillReceiveProps: ['nextProps'],
      componentWillUpdate: ['nextProps', 'nextState'],
      shouldComponentUpdate: ['nextProps', 'nextState'],
    };

    function check(node) {
      if (
        checkedMethods.hasOwnProperty(node.key.name) &&
        node.value.type === 'FunctionExpression'
      ) {
        const argNames = checkedMethods[node.key.name];
        node.value.params.forEach((param, i) => {
          const enforcedName = argNames[i];
          if (!enforcedName) return;
          if (param.type === 'Identifier' && param.name !== enforcedName) {
            context.report({
              node: param,
              message: `\`${param.name}\` must be named \`${enforcedName}\``,
              fix: fixer => fixer.replaceText(
                node,
                sourceCode.getText(node)
                  .replace(new RegExp(`\\b${param.name}\\b`, 'g'), enforcedName)
              ),
            });
          }
        });
      }
    }

    return {
      MethodDefinition: check,
      Property: check,
    };
  },
};
