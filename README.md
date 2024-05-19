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

⚠️ If you run into compilation errors due to
incompatible or incorrect types in your dependencies
you will need to enable `skipLibCheck`,
which ignores errors in `d.ts` files
(both those in node_modules and your own code).
