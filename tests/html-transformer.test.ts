import { transformHTML } from "../src/html-transformer";

const FooComponent = `<template>
  <FooComponent :param @click="">
  </FooComponent>
</template>`;

const foo_component = `<template>
  <foo_component :param @click="">
  </foo_component>
</template>`;

describe("test transformHTML", () => {
	it("transform <input> to <input />", () => {
		expect(transformHTML(`<input>`)).toEqual(`<input />`);
	});

	it("transform FooComponent to foo_component", () => {
		const map: Map<string, string> = new Map();
		map.set("FooComponent", "foo_component");

		expect(transformHTML(FooComponent, map)).toEqual(foo_component);
	});

	it("transform <foo /> to <foo></foo>", () => {
		expect(transformHTML("<foo />")).toEqual("<foo></foo>");
	});
});

