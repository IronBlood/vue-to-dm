import appRoot from "app-root-path";
import { build } from "../src/index";

describe("test build", () => {
	it("test build .src", () => {
		build([`${appRoot}/tests/.src`], {
			dist_dir: `${appRoot}/tests/.dist`,
		});
		// FIXME check output files
	});
});

