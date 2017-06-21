const rule = require('../jsx-sort-props');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('./test-utils');

const ruleTester = new RuleTester();
ruleTester.run('jsx-sort-props', rule, {
  valid: withParserOptions([
    {
      code: '<Foo />',
    },
    {
      code: '<Foo a b c />',
    },
    {
      code: '<Foo b d a />',
    },
    {
      code: [
        '<Foo',
        '  a',
        '  b',
        '/>',
      ].join('\n'),
    },
    {
      code: [
        '<Foo',
        '  b',
        '  c',
        '  {...foo}',
        '  {...bar}',
        '  a',
        '/>',
      ].join('\n'),
    },
  ]),

  invalid: withParserOptions([
    {
      code: [
        '<Foo',
        '  b',
        '  a',
        '/>',
      ].join('\n'),
      output: [
        '<Foo',
        '  a',
        '  b',
        '/>',
      ].join('\n'),
      errors: [{ message: 'These props should be sorted' }],
    },
    {
      code: [
        '<Foo',
        '  c="c"',
        '  b',
        '  a',
        '/>',
      ].join('\n'),
      output: [
        '<Foo',
        '  a',
        '  b',
        '  c="c"',
        '/>',
      ].join('\n'),
      errors: [{ message: 'These props should be sorted' }],
    },
    {
      code: [
        '<Foo',
        '  c',
        '  b',
        '  {...props}',
        '  a',
        '/>',
      ].join('\n'),
      output: [
        '<Foo',
        '  b',
        '  c',
        '  {...props}',
        '  a',
        '/>',
      ].join('\n'),
      errors: [{ message: 'These props should be sorted' }],
    },
    {
      code: [
        '<Foo',
        '  c',
        '  b',
        '  {...props}',
        '  {...bar}',
        '  e',
        '  a',
        '/>',
      ].join('\n'),
      output: [
        '<Foo',
        '  b',
        '  c',
        '  {...props}',
        '  {...bar}',
        '  a',
        '  e',
        '/>',
      ].join('\n'),
      errors: [
        { message: 'These props should be sorted' },
        { message: 'These props should be sorted' },
      ],
    },
  ]),
});

