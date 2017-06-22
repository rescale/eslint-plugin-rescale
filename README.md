# eslint-plugin-rescale

This repo contains custom [ESLint][e] [rules][r] and ESLint configs used across Rescale projects.

## Development

Run `yarn` to install dependencies.

Changes to rules and configs should be tested on other projects before releasing a new version. To test changes locally, run

```
yarn link
```

in this directory. Then `cd` into the project using this package and run

```
yarn link eslint-plugin-rescale
```

This project will now be symlinked to the other project's `node_modules/eslint-plugin-rescale` directory.

You may also want to lint this project by running

```
npm run lint
```

and run tests with

```
npm run test
```

## Releasing

Update the version in `package.json`. Create an annotated tag with the same version number and push the tag. E.g.:

```
git tag -a 1.0.1 -m "1.0.1"
git push origin 1.0.1
```

Version numbers should follow [semver][s].

## ESLint plugin development

Consult ESLint's Developer Guides for developing rules and plugins. Specifically these should be of interest:

- [Working with Rules][w]
- [Working with Plugins][p]
- [Sharable Configs][c]

[c]: http://eslint.org/docs/developer-guide/shareable-configs
[e]: http://eslint.org/
[p]: http://eslint.org/docs/developer-guide/working-with-plugins
[r]: http://eslint.org/docs/rules/
[s]: http://semver.org/
[w]: http://eslint.org/docs/developer-guide/working-with-rules
