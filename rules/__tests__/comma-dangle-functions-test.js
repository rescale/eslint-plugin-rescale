const rule = require('../comma-dangle-functions');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('./test-utils');

const ruleTester = new RuleTester();

function testCasesForFunctionParams(argPattern, options={}) {
  const { output } = options;

  return [
    // FunctionDeclaration
    Object.assign(
      { code: `function foo(${argPattern}) {}` },
      options,
      output && { output: `function foo(${output}) {}` }
    ),
    Object.assign(
      { code: `function foo(${argPattern}) {\n}` },
      options,
      output && { output: `function foo(${output}) {\n}` }
    ),
    // FunctionExpression
    Object.assign(
      { code: `foo = function(${argPattern}) {}` },
      options,
      output && { output: `foo = function(${output}) {}` }
    ),
    Object.assign(
      { code: `foo = function(${argPattern}) {\n}` },
      options,
      output && { output: `foo = function(${output}) {\n}` }
    ),
    // ArrowFunctionEXpression
    Object.assign(
      { code: `(${argPattern}) => {}` },
      options,
      output && { output: `(${output}) => {}` }
    ),
    Object.assign(
      { code: `(${argPattern}) => {\n}` },
      options,
      output && { output: `(${output}) => {\n}` }
    ),
  ];
}

function testCasesForFunctionParamsAndCallArgs(argPattern, options={}) {
  const { output } = options;

  return [
    ...testCasesForFunctionParams(argPattern, options),
    // CallExpression
    Object.assign(
      { code: `foo(${argPattern})` },
      options,
      output && { output: `foo(${output})` }
    ),
  ];
}

ruleTester.run('comma-dangle-functions', rule, {
  valid: withParserOptions([
    ...testCasesForFunctionParams(''),
    ...testCasesForFunctionParams('foo'),
    ...testCasesForFunctionParams('foo, bar'),
    ...testCasesForFunctionParams([
      '',
      'bar, baz',
      '',
    ].join('\n')),
    ...testCasesForFunctionParams([
      '',
      'bar, baz,',
      '',
    ].join('\n')),
    ...testCasesForFunctionParams([
      'bar,',
      'baz',
    ].join('\n')),
    ...testCasesForFunctionParams([
      'bar',
      '',
    ].join('\n')),
    ...testCasesForFunctionParams([
      'bar,',
      '',
    ].join('\n')),
    {
      code: [
        'cx("a", "b")',
      ].join('\n'),
      options: [{ callee: ['cx'] }],
    },
    {
      code: [
        'cx(',
        '  "a",',
        '  "b",',
        ')',
      ].join('\n'),
      options: [{ callee: ['cx'] }],
    },
    {
      code: [
        'set(',
        '  "a",',
        '  "b"',
        ')',
      ].join('\n'),
      options: [{ callee: ['cx'] }],
    },
  ]),

  invalid: withParserOptions([
    ...testCasesForFunctionParamsAndCallArgs('foo,', {
      output: 'foo',
      errors: [{ message: 'Unexpected trailing comma' }],
    }),
    ...testCasesForFunctionParamsAndCallArgs('foo, bar,', {
      output: 'foo, bar',
      errors: [{ message: 'Unexpected trailing comma' }],
    }),
    ...testCasesForFunctionParamsAndCallArgs([
      'bar,',
      'baz,',
    ].join('\n'), {
      output: 'bar,\nbaz',
      errors: [{ message: 'Unexpected trailing comma' }],
    }),
    ...testCasesForFunctionParams([
      'bar,',
      'baz',
      '',
    ].join('\n'), {
      output: 'bar,\nbaz,\n',
      errors: [{ message: 'Missing trailing comma' }],
    }),
    {
      code: [
        'cx(',
        '  "a",',
        '  "b"',
        ')',
      ].join('\n'),
      output: [
        'cx(',
        '  "a",',
        '  "b",',
        ')',
      ].join('\n'),
      options: [{ callee: ['cx'] }],
      errors: [{ message: 'Missing trailing comma' }],
    },
    {
      code: [
        'Something.of(',
        '  "a",',
        '  "b"',
        ')',
      ].join('\n'),
      output: [
        'Something.of(',
        '  "a",',
        '  "b",',
        ')',
      ].join('\n'),
      options: [{ callee: ['of'] }],
      errors: [{ message: 'Missing trailing comma' }],
    },
    {
      code: [
        'Something["of"](',
        '  "a",',
        '  "b"',
        ')',
      ].join('\n'),
      output: [
        'Something["of"](',
        '  "a",',
        '  "b",',
        ')',
      ].join('\n'),
      options: [{ callee: ['of'] }],
      errors: [{ message: 'Missing trailing comma' }],
    },
  ]),
});
