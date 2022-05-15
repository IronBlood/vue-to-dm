/**
 * Convert name to underline connected lower case name.
 * And also remove illegal hyphen sign
 * e.g.:
 * 1. FooComponent => foo_component
 * 2. foo-component => foo_component
 * 3. Foo-Component => foo_component
 */
export const rename_to_underline = (name: string): string => {
	return name
		.split(/(?=[A-Z])/)
		.join("_")
		.toLowerCase()
		.replaceAll("-_", "_")
		.replaceAll("-", "_");
};

