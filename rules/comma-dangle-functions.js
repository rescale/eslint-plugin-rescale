const last = require('lodash/last');

/**
 * The goal of this rule is to minimize diffs when adding function parameters or
 * call arguments.
 *
 * Overview:
 * * Require trailing comma in function parameters (not call arguments) if
 *   params span multiple lines. Why? Because usually that means more arguments
 *   will be added.
 * * Disallow ,) for function parameters and call arguments. Why? Looks like a
 *   typo and can confuse people. Adding an item at the end will change the
 *   entire line anyway.
 * * Require trailing comma in call arguments if params span multiple lines, and
 *   if callee is known to take variable args (e.g. cx(), of(), etc...). We
 *   define the list in the eslint config. This is not turned on for all callees
 *   because it may confuse people into thinking the callee actually takes
 *   multiple arguments. For example, we wouldn't want `set(key, value)` to
 *   require a trailing comma if it takes up multiple lines because it may
 *   confuse the reader into thinking it takes a third argument.
 * * For everything else, trailing commas are optional.
 */
module.exports = {
  meta: {
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          callee: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    const configuration = context.options[0] || {};
    const callee = new Set(configuration.callee || []);

    function isLineBetweenTokens(token1, token2) {
      return token1.loc.start.line !== token2.loc.start.line;
    }

    function getCalleeName(node) {
      const { callee } = node;
      if (callee.type === 'Identifier') {
        return callee.name;
      } else if (callee.type === 'MemberExpression') {
        return callee.property.name || callee.property.value;
      }
    }

    const check = (argListName) => (node) => {
      const args = node[argListName];

      if (!args.length) return;

      const firstArg = args[0];
      const lastArg = last(args);
      const twoTokensAfterLastArg = sourceCode.getTokensAfter(lastArg, 2);
      const tokenAfterLastArg = twoTokensAfterLastArg[0];
      const hasTrailingComma = tokenAfterLastArg.value === ',';

      // Disallow ,)
      if (
        hasTrailingComma &&
        !sourceCode.isSpaceBetweenTokens(...twoTokensAfterLastArg)
      ) {
        context.report({
          loc: tokenAfterLastArg.loc,
          message: 'Unexpected trailing comma',
          fix: fixer => fixer.remove(tokenAfterLastArg),
        });
        return;
      }

      // Fast valid: Skip if all args are on the same line
      if (firstArg.loc.start.line === lastArg.loc.end.line) {
        return;
      }

      const lastTokenOfLastArg = sourceCode.getLastToken(lastArg);

      // Enforce lastArg\n -> lastArg,\n if there are more than 1 arguments. Do
      // this for all param defs. For call expressions, enforce only if callee
      // is configured.
      if (
        args.length > 1 &&
        !hasTrailingComma &&
        isLineBetweenTokens(lastTokenOfLastArg, tokenAfterLastArg) &&
        (
          argListName === 'params' ||
          (argListName === 'arguments' && callee.has(getCalleeName(node)))
        )
      ) {
        context.report({
          loc: {
            line: lastArg.loc.end.line,
            column: lastArg.loc.end.column + 1,
          },
          message: 'Missing trailing comma',
          fix: fixer => fixer.insertTextAfter(lastArg, ','),
        });
      }
    };

    return {
      ArrowFunctionExpression: check('params'),
      CallExpression: check('arguments'),
      FunctionDeclaration: check('params'),
      FunctionExpression: check('params'),
    };
  },
};
