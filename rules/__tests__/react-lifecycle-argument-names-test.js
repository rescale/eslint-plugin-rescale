const flattenDeep = require('lodash/flattenDeep');
const range = require('lodash/range');
const rule = require('../react-lifecycle-argument-names');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('./test-utils');

const lifecycleMethods = {
  componentDidMount: ['prevProps', 'prevState'],
  componentWillReceiveProps: ['nextProps'],
  componentWillUpdate: ['nextProps', 'nextState'],
  shouldComponentUpdate: ['nextProps', 'nextState'],
};

function generateValidTests() {
  return flattenDeep(Object.keys(lifecycleMethods).map(method => {
    const argNames = lifecycleMethods[method].concat(['extra']);
    const destructuredProps = argNames.map((_, i) => `{ prop${i} }`);
    return [
      range(0, argNames.length + 1).map(numArgs => {
        const args = argNames.slice(0, numArgs).join(', ');
        return [
          { code: `o = { ${method}(${args}) {} }` },
          { code: `class Component { ${method}(${args}) {} }` },
        ];
      }),
      { code: `o = { ${method}(${destructuredProps}) {} }` },
      { code: `class Component { $${method}(${destructuredProps}) {} }` },
    ];
  }));
}

function generateInvalidTests() {
  return flattenDeep(Object.keys(lifecycleMethods).map(method => {
    const argNames = lifecycleMethods[method];
    const badArgNames = argNames.map(arg => `${arg}0`);
    return range(1, argNames.length + 1).map(numArgs => {
      const args = badArgNames.slice(0, numArgs).join(', ');
      const good = args.replace(badArgNames[0], argNames[0]);

      return [
        {
          code: `o = { ${method}(${args}) { [${args}]; } }`,
          output: `o = { ${method}(${good}) { [${good}]; } }`,
          errors: badArgNames.slice(0, numArgs).map((badArg, i) =>
            `\`${badArg}\` must be named \`${argNames[i]}\``
          ),
        },
        {
          code: `class Component { ${method}(${args}) { [${args}]; } }`,
          output: `class Component { ${method}(${good}) { [${good}]; } }`,
          errors: badArgNames.slice(0, numArgs).map((badArg, i) =>
            `\`${badArg}\` must be named \`${argNames[i]}\``
          ),
        },
      ];
    });
  }));
}

const ruleTester = new RuleTester();
ruleTester.run('react-lifecycle-argument-names', rule, {
  valid: withParserOptions([
    ...generateValidTests(),
  ]),

  invalid: withParserOptions([
    ...generateInvalidTests(),
  ]),
});

