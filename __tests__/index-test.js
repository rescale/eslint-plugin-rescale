const fs = require('fs');
const index = require('../index');
const path = require('path');

describe('index', () => {
  it('exports all configs', () => {
    const files = fs.readdirSync(path.resolve('configs'));
    const configs = files
      .filter(f => f.endsWith('.js'))
      .map(f => f.replace(/\.js$/, ''))
      ;
    expect(Object.keys(index.configs).sort()).toEqual(configs.sort());
  });

  it('exports all rules', () => {
    const ignore = new Set([
      'utils.js',
    ]);
    const files = fs.readdirSync(path.resolve('rules'));
    const rules = files
      .filter(f => f.endsWith('.js') && !ignore.has(f))
      .map(f => f.replace(/\.js$/, ''))
      ;
    expect(Object.keys(index.rules).sort()).toEqual(rules.sort());
  });
});
