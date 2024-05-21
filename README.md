# @dominikrusso/tsconfig

Base tsconfigs for node and browsers.

## Usage

```jsonc
// tsconfig.json

{
  "extends": "@dominikrusso/tsconfig/node.json",
  "compilerOptions": {
    "outDir": "./dist",
  },
  "include": ["src"],
}
```

All paths in tsconfigs are resolved relative to the file defining them.
Therefore you must specify properties like `include`,
`compilerOptions.outDir` or `compilerOptions.declarationDir` yourself.

[TypeScript 5.5](https://devblogs.microsoft.com/typescript/announcing-typescript-5-5-beta/#the-configdir-template-variable-for-configuration-files)
will add support for resolving paths relative to the importing config.

⚠️ `skipLibCheck` is enabled by default.
If you are building a library and writing `d.ts` files
you should consider disabling this option.
Please refer to
[this post form Testim](https://www.testim.io/blog/typescript-skiplibcheck/)
for a detailed explanation of `skipLibCheck`.
