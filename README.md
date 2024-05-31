# @dominikrusso/tsconfig

Base tsconfigs.

## Provided Configs

`<transpiler>-<environment>-<variant>.json`

- transpiler
  - `tsc`: you are using tsc to transpile your package
  - `bundler`: you are using a bundler (esbuild, bun, swc, ...)
- environment:
  - `browser`: you are using [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
  - `node`: you are _not_ using Web APIs
- variant:
  - `app`: you are creating an application
  - `lib`: you are creating a library

## Usage

Add `@dominikrusso/tsconfig` as a devDependency.
Then extend one of the configs:

```jsonc
// tsconfig.json

{
	"extends": "@dominikrusso/tsconfig/tsc-node-app.json",
	"compilerOptions": {
		"outDir": "./dist",
	},
	"include": ["src"],
}
```

All paths in tsconfigs are resolved relative to the file defining them.
Therefore, you must specify properties like `include`,
`compilerOptions.outDir` or `compilerOptions.declarationDir` yourself.

[TypeScript 5.5](https://devblogs.microsoft.com/typescript/announcing-typescript-5-5-beta/#the-configdir-template-variable-for-configuration-files)
will add support for resolving paths relative to the importing config.

⚠️ `skipLibCheck` is enabled by default.
If you are building a library and writing `d.ts` files
you should consider disabling this option.
Please refer to
[this post from Testim](https://www.testim.io/blog/typescript-skiplibcheck/)
for a detailed explanation of `skipLibCheck`.
