import {
	transform_vue_content,
} from "../src/transform";

describe("test transform_vue_content", () => {
	it("remove import", () => {
		const result = transform_vue_content(`<template>
  <div></div>
</template>
<script>
import a from "./foo";
</script>`);
		expect(result.code).toEqual("");
	});

	it("convert component_name", () => {
		const result = transform_vue_content(`<template>
  <div></div>
</template>
<script>
import a from "./BarComponent.vue";

export default {
  data() {
    return {
      a,
      y: a,
    };
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
		expect(result.code).toEqual(`export default {
  data() {
    return {
      a: bar_component,
      y: bar_component
    };
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
  }

};`);
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
		expect(result.code).toEqual(`export default {};`);
	});
});

