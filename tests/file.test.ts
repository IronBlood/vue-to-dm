import { walk_dir } from "../src/file";

describe("test walk_dir", () => {
	it("dummy dir", () => {
		// running from project root
		const list = walk_dir("./tests/.dummy_dir");
		expect(list.length).toBe(3);
		expect(list).toEqual(expect.arrayContaining([
			"./tests/.dummy_dir/a.vue",
			"./tests/.dummy_dir/b/b.vue",
			"./tests/.dummy_dir/c/c/c.vue",
		]));
	});
});

