const rule = require('../jsx-bracket-spacing');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('./test-utils');

const ruleTester = new RuleTester();
ruleTester.run('jsx-bracket-spacing', rule, {
  valid: withParserOptions([
    {
      code: '<Foo />',
    },
    {
      code: '<Foo></Foo>',
    },
    {
      code: [
        '<Foo',
        '></Foo>',
      ].join('\n'),
    },
    {
      code: [
        '<Foo',
        '/>',
      ].join('\n'),
    },
  ]),

  invalid: withParserOptions([
    ...[' ', '  ', '\t', '\n'].map(whitespace => ({
      code: `<${whitespace}Foo />`,
      output: '<Foo />',
      errors: [{ message: 'Unexpected whitespace after opening bracket' }],
    })),
    ...[' ', '  ', '\t', '\n'].map(whitespace => ({
      code: `<Foo /${whitespace}>`,
      output: '<Foo />',
      errors: [{ message: 'Unexpected whitespace inside closing bracket' }],
    })),
    {
      code: '<Foo/>',
      output: '<Foo />',
      errors: [{ message: 'Expected space before closing bracket' }],
    },
    ...[' ', '\t'].map(whitespace => ({
      code: `<Foo${whitespace}></Foo>`,
      output: '<Foo></Foo>',
      errors: [{ message: 'Unexpected whitespace before closing bracket' }],
    })),
    ...[' ', '  ', '\t', '\n'].map(whitespace => ({
      code: `<Foo><${whitespace}/Foo>`,
      output: '<Foo></Foo>',
      errors: [{ message: 'Unexpected whitespace inside opening bracket' }],
    })),
    ...[' ', '  ', '\t', '\n'].map(whitespace => ({
      code: `<Foo></${whitespace}Foo>`,
      output: '<Foo></Foo>',
      errors: [{ message: 'Unexpected whitespace after opening bracket' }],
    })),
    ...[' ', '  ', '\t', '\n'].map(whitespace => ({
      code: `<Foo></Foo${whitespace}>`,
      output: '<Foo></Foo>',
      errors: [{ message: 'Unexpected whitespace before closing bracket' }],
    })),
  ]),
});
