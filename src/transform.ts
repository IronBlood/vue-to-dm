import fs from "fs";
import path from "path";
import {
	transformSync,
	types as t,
} from "@babel/core";
import {
	parseComponent,
} from "vue-template-compiler";
import {
	rename_to_underline,
} from "./utils";

const vue_script_transformer = (component_rename_map: Map<string, string>) => {
	return () => ({
		visitor: {
			ImportDeclaration(babelPath: babel.NodePath) {
				const node = babelPath.node as t.ImportDeclaration;
				if (/\.vue$/.test(node.source.value)) {
					const p = path.parse(node.source.value);
					for (const specifier of node.specifiers) {
						if (specifier.type === "ImportDefaultSpecifier") {
							const component_name = rename_to_underline(p.name);
							if (specifier.local.name != component_name) {
								component_rename_map.set(specifier.local.name, component_name);
							}
							break;
						}
					}
				}
				babelPath.remove();
			},
			Identifier(babelPath: babel.NodePath) {
				const node = babelPath.node as t.Identifier;
				if (component_rename_map.has(node.name)) {
					const component_name = component_rename_map.get(node.name);
					const new_identifier = t.identifier(component_name);
					switch (babelPath.parent.type) {
					case "ObjectProperty":
						const parent_op = babelPath.parent as t.ObjectProperty;
						if (parent_op.value == node) {
							parent_op.value = new_identifier;
						}
						break;
					case "VariableDeclarator":
						const parent_vd = babelPath.parent as t.VariableDeclarator;
						if (parent_vd.init == node) {
							parent_vd.init = new_identifier;
						}
						break;
					case "ConditionalExpression":
						const parent_ce = babelPath.parent as t.ConditionalExpression;
						if (parent_ce.test == node) {
							parent_ce.test = new_identifier;
						}
						if (parent_ce.consequent == node) {
							parent_ce.consequent = new_identifier;
						}
						if (parent_ce.alternate == node) {
							parent_ce.alternate = new_identifier;
						}
						break;
					case "BinaryExpression":
						const parent_be = babelPath.parent as t.BinaryExpression;
						if (parent_be.left == node) {
							parent_be.left = new_identifier;
						}
						if (parent_be.right == node) {
							parent_be.right = new_identifier;
						}
						break;
					case "UpdateExpression":
						const parent_ue = babelPath.parent as t.UpdateExpression;
						if (parent_ue.argument == node) {
							parent_ue.argument = new_identifier;
						}
						break;
					case "IfStatement":
						const parent_if = babelPath.parent as t.IfStatement;
						if (parent_if.test == node) {
							parent_if.test = new_identifier;
						}
						break;
					case "ExpressionStatement":
						const parent_es = babelPath.parent as t.ExpressionStatement;
						if (parent_es.expression == node) {
							parent_es.expression = new_identifier;
						}
						break;
					}
				}
			},
		},
	});
}

export const transform_vue_content = (content: string) => {
	const code = parseComponent(content);

	const script = code?.script?.content || `export default {};`;

	const component_rename_map = new Map<string, string>();

	const output = transformSync(script, {
		plugins: [
			vue_script_transformer(component_rename_map),
		],
	});

	return {
		code: output.code,
	};
}

export const transform_vue = (filename: string) => {
	if (fs.statSync(filename).isFile()) {
		const content = fs.readFileSync(filename, "utf8");
		transform_vue_content(content);
	}
}

