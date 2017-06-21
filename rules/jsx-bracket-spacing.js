/**
 * The goal of this rule is consistency.
 *
 * Ensure consistent spacing after the opening bracket and before the closing
 * bracket of both JSXOpeningElement and JSXClosingElements. Ensure no spaces
 * in between `</` or `/>` tokens.
 */
module.exports = {
  meta: {
    fixable: 'code',
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    function reportUnexpectedWhitespaceBetween(first, second, message) {
      context.report({
        loc: { start: first.loc.end, end: second.loc.start },
        message,
        fix: fixer => fixer.replaceTextRange([first.end, second.start], ''),
      });
    }

    return {
      JSXOpeningElement(node) {
        const [openingBracket, tagName] = sourceCode.getFirstTokens(node, 2);

        if (sourceCode.isSpaceBetweenTokens(openingBracket, tagName)) {
          reportUnexpectedWhitespaceBetween(
            openingBracket,
            tagName,
            'Unexpected whitespace after opening bracket'
          );
        }

        if (node.selfClosing) {
          const [beforeClosing, slash, closingBracket] =
            sourceCode.getLastTokens(node, 3);

          if (sourceCode.isSpaceBetweenTokens(slash, closingBracket)) {
            reportUnexpectedWhitespaceBetween(
              slash,
              closingBracket,
              'Unexpected whitespace inside closing bracket'
            );
          }

          if (
            beforeClosing.loc.start.line === slash.loc.start.line &&
            !sourceCode.isSpaceBetweenTokens(beforeClosing, slash)
          ) {
            context.report({
              loc: slash,
              message: 'Expected space before closing bracket',
              fix: fixer => fixer.insertTextBefore(slash, ' '),
            });
          }
        } else {
          const [beforeClosing, closingBracket] =
            sourceCode.getLastTokens(node, 2);

          if (
            beforeClosing.loc.start.line === closingBracket.loc.start.line &&
            sourceCode.isSpaceBetweenTokens(beforeClosing, closingBracket)
          ) {
            reportUnexpectedWhitespaceBetween(
              beforeClosing,
              closingBracket,
              'Unexpected whitespace before closing bracket'
            );
          }
        }
      },

      JSXClosingElement(node) {
        const [openingBracket, slash, afterOpening] =
          sourceCode.getFirstTokens(node, 3);
        const [beforeClosing, closingBracket] =
          sourceCode.getLastTokens(node, 2);

        if (sourceCode.isSpaceBetweenTokens(openingBracket, slash)) {
          reportUnexpectedWhitespaceBetween(
            openingBracket,
            slash,
            'Unexpected whitespace inside opening bracket'
          );
        }

        if (sourceCode.isSpaceBetweenTokens(slash, afterOpening)) {
          reportUnexpectedWhitespaceBetween(
            slash,
            afterOpening,
            'Unexpected whitespace after opening bracket'
          );
        }

        if (sourceCode.isSpaceBetweenTokens(beforeClosing, closingBracket)) {
          reportUnexpectedWhitespaceBetween(
            beforeClosing,
            closingBracket,
            'Unexpected whitespace before closing bracket'
          );
        }
      },
    };
  },
};
