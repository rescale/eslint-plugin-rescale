const last = require('lodash/last');

/**
 * The goal of this rule is consistency and readability.
 *
 * It's easier to tell what props are passed to a component when they are
 * sorted. Order usually does not matter, unless we use spread attributes which
 * will override previous props. Sorting will only be checked for props in
 * between spread attributes.
 */
module.exports = {
  meta: {
    fixable: 'code',
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    function check(props) {
      const texts = props.map(p => sourceCode.getText(p));

      if (!isSorted(texts.map(s => s.toLowerCase()))) {
        context.report({
          loc: { start: props[0].loc.start, end: last(props).loc.end },
          message: 'These props should be sorted',
          fix(fixer) {
            texts.sort((a, b) => {
              const aLower = a.toLowerCase();
              const bLower = b.toLowerCase();
              return aLower < bLower ? -1 : aLower > bLower ? 1 : 0;
            });
            const indentation = props[0].loc.start.column;
            return fixer.replaceTextRange(
              [props[0].start, last(props).end],
              texts.map(t => ' '.repeat(indentation) + t).join('\n').trim()
            );
          },
        });
      }
    }

    function isSorted(ary) {
      return ary.every((value, idx) =>
        idx === 0 || ary[idx - 1] <= value
      );
    }

    function isSpread(prop) {
      return prop.type === 'JSXSpreadAttribute';
    }

    return {
      JSXOpeningElement(node) {
        if (node.attributes.length === 0) return;
        if (node.loc.start.line === node.loc.end.line) return;

        const firstProp = node.attributes[0];
        const propGroups = isSpread(firstProp) ? [] : [[firstProp]];

        node.attributes.reduce((prevProp, prop) => {
          if (isSpread(prevProp) && !isSpread(prop)) {
            propGroups.push([prop]);
          } else if (!isSpread(prevProp) && !isSpread(prop)) {
            last(propGroups).push(prop);
          }
          return prop;
        });

        propGroups.forEach(check);
      },
    };
  },
};
