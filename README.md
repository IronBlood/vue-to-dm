# Vue to DM

![Vue to DM CI](https://github.com/IronBlood/vue-to-dm/workflows/vue-to-dm%20ci/badge.svg?branch=main) [![Coverage Status](https://coveralls.io/repos/github/IronBlood/vue-to-dm/badge.svg?branch=main)](https://coveralls.io/github/IronBlood/vue-to-dm?branch=main)

This utility helps to transform Vue SFC files to PwC Digital Maker compatible SFC format:

* Removing all `import`s from `<script />` blocks.
* Removing `components` property from exported default objects.
* Renaming names of components based on their filenames in `underlined_lowercased_style`. Usages in templates will also be transformed automatically. These names will be used as registered components in Digital Maker.
* Combining all `style` blocks into a single `app.css` file.

## Usage

Install:

```bash
npm i vue-to-dm -D
```

Create your build script:

```javascript
const { build } = require("./dist/index.js");

build([`/path/to/folders/of/src`], {
	dist_dir: `/path/to/dist/dir`,
});
```

API:

```typescript
export const build = (dirs: string[], options: BuildOptions = {}): void;
```

* `dirs`: an array of folders containing SFC files to be transformed.
* `options`:
	* `dist_dir`: target directory which will contain `app.css` and `components` directory after `build()`.
	* `prettier`: [options](https://prettier.io/docs/en/options.html) to format output files with Prettier.

