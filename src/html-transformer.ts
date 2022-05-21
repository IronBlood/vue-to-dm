import { parser, Node, NodeTag } from "posthtml-parser";
import { render, closingSingleTagOptionEnum } from "posthtml-render";

const isNodeTag = (x: Node): x is NodeTag => {
	return typeof x === "object";
};

const dfs_ast = (ast: (Node | Node[])[], rename_map: Map<string, string>) => {
	for (const node of ast) {
		if (Array.isArray(node)) {
			dfs_ast(node, rename_map);
		} else if (isNodeTag(node)) {
			if (typeof node.tag === "string" && rename_map.has(node.tag)) {
				node.tag = rename_map.get(node.tag);
			}

			if (Array.isArray(node.content)) {
				dfs_ast(node.content, rename_map);
			}
		}
	}
};

export const transformHTML = (html: string, rename_map?: Map<string, string>): string => {
	const ast = parser(html, {
		recognizeSelfClosing: true,
		recognizeNoValueAttribute: true,
	});

	if (rename_map) {
		dfs_ast(ast, rename_map);
	}

	return render(ast, {
		closingSingleTag: closingSingleTagOptionEnum.slash,
	});
};

