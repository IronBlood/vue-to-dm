// Example
const { build } = require("./dist/index.js");
const appRoot = require("app-root-path");

build([`${appRoot}/tests/.src`], {
	dist_dir: `${appRoot}/tests/.dist`,
});

