import appRoot from "app-root-path";
import {
	walk_dir,
	resolve_file
} from "../src/file";

describe("test walk_dir", () => {
	it("dummy dir", () => {
		const list = walk_dir(`${appRoot}/tests/.dummy_dir`);
		expect(list.length).toBe(3);
		expect(list).toEqual(expect.arrayContaining([
			`${appRoot}/tests/.dummy_dir/a.vue`,
			`${appRoot}/tests/.dummy_dir/b/b.vue`,
			`${appRoot}/tests/.dummy_dir/c/c/c.vue`,
		]));
	});
});

describe("test resolve_file", () => {
	test("@/views/a.vue", () => {
		expect(resolve_file({
			filename: "@/views/a.vue",
			basepath: ".",
		})).toEqual(`${appRoot}/src/views/a.vue`);
	});

	test("fs", () => {
		expect(resolve_file({
			filename: "fs",
			basepath: ".",
		})).toBeNull();
	});

	test("relative", () => {
		expect(resolve_file({
			filename: "./a.vue",
			basepath: "./src/",
		})).toEqual("./src/a.vue");
	});
});

