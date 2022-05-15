import {
	rename_to_underline,
} from "../src/utils";

describe("test rename filename", () => {
	it("rename Foo", () => {
		expect(rename_to_underline("Foo")).toMatchSnapshot();
	});

	it("rename FooComponent", () => {
		expect(rename_to_underline("FooComponent")).toMatchSnapshot();
	});

	it("rename foo-component", () => {
		expect(rename_to_underline("foo-component")).toMatchSnapshot();
	});

	it("rename Foo-Component", () => {
		expect(rename_to_underline("Foo-Component")).toMatchSnapshot();
	});
});

