import appRoot from "app-root-path";
import {
	transform_vue_content,
	transform_vue,
} from "../src/transform";

describe("test transform_vue_content", () => {
	it("remove import", () => {
		const result = transform_vue_content(`<template>
  <div></div>
</template>
<script>
import a from "./foo";
</script>`);
		expect(result.script).toEqual("");
	});

	it("convert component_name", () => {
		const result = transform_vue_content(`<template>
  <div></div>
</template>
<script>
import a from "./BarComponent";

export default {
  data() {
    return {
      a,
      y: a,
    };
  },
  components: {
    a,
  },
  mounted() {
    let b = a;
    const c = a;
    var x = a;
    a + 1;
    1 + a;
    a++;
    b = a + 1;
    a ? a : a;
    if (a) {
      a;
    }
    a;
  }
};
</script>
`);
		expect(result.script).toEqual(`


export default {
  data() {
    return {
      a: bar_component,
      y: bar_component };

  },



  mounted() {
    let b = bar_component;
    const c = bar_component;
    var x = bar_component;
    bar_component + 1;
    1 + bar_component;
    bar_component++;
    b = bar_component + 1;
    bar_component ? bar_component : bar_component;
    if (bar_component) {
      bar_component;
    }
    bar_component;
  } };`);
	});

	it("remove components property", () => {
		const result = transform_vue_content(`
<template>
  <div></div>
</template>
<script>
import a from "./foo";
export default {
  components: {
    a,
  },
};
</script>
`);
		expect(result.script).toEqual("\n\nexport default {};");
	});

	it("replace component in template", () => {
		const result = transform_vue_content(`<template>
  <div>
    <a foo />
    <a :src="dd"></a>
    <a><div></div></a>
  </div>
</template>
<script>
import a from "./b.vue";
export default {
  components: { a },
};
</script>`);
		expect(result.template).toEqual(`
<div>
  <b foo></b>
  <b :src="dd"></b>
  <b><div></div></b>
</div>
`);
	});
});

describe("test transform_vue", () => {
	it("test transform_vue .dummy_dir/a.vue", () => {
		const result = transform_vue(`${appRoot}/tests/.dummy_dir/a.vue`);
		expect(result).toEqual({
			component_name: "a",
			script: "\nexport default {};",
			style: "\n.test { }\n\n\n.foo { }\n",
			template: "\n<div></div>\n",
		});
	});
});

