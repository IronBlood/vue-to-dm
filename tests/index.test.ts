import appRoot from "app-root-path";
import fs from "fs";
import rimraf from "rimraf";
import { build } from "../src/index";

const dir_src = `${appRoot}/tests/.src`,
	dir_dist = `${appRoot}/tests/.dist`;

const rm_dir_dist = () => {
	if (fs.existsSync(dir_dist)) {
		const stat = fs.statSync(dir_dist);
		if (stat.isFile()) {
			fs.rmSync(dir_dist);
		} else if (stat.isDirectory()) {
			rimraf.sync(dir_dist);
		}
	}
};

describe("test build", () => {
	beforeEach(rm_dir_dist);
	afterEach(rm_dir_dist);

	it("test build .src", () => {
		build([dir_src], {
			dist_dir: dir_dist,
		});
		const filename = `${dir_dist}/components/app.vue`;
		expect(fs.existsSync(filename)).toBeTruthy();
		const result = `<template>
	<div></div>
</template>

<script>
const a = "";

// test
const b = "";

export default {
	data() {
		return {};
	},
	mounted() {},
};
</script>
`;
		expect(fs.readFileSync(filename, "utf8")).toEqual(result);

		const css = `${dir_dist}/app.css`;
		expect(fs.existsSync(css)).toBeTruthy();

		const css_content = `.foo1 {
	display: flex;
}
.foo2 {
	display: block;
}

.foo3 {
	display: hidden;
}
`
		expect(fs.readFileSync(css, "utf8")).toEqual(css_content);
	});
});

