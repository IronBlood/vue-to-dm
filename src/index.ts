import fs from "fs";
import appRoot from "app-root-path";
import prettier, { Options as PrettierOptions } from "prettier";
import { walk_dir } from "./file";
import { transform_vue } from "./transform";

export interface BuildOptions {
	dist_dir?: string;
	prettier?: PrettierOptions;
}

export const build = (dirs: string[], options: BuildOptions = {}): void => {
	const dist_dir = options.dist_dir || `${appRoot}/dist`;
	const comp_dir = `${dist_dir}/components`;
	const prettier_options: PrettierOptions = options.prettier || {
		parser: "vue",
		useTabs: true,
		arrowParens: "avoid",
	};

	// TODO check files exist
	if (!fs.existsSync(dist_dir))
		fs.mkdirSync(dist_dir);
	if (!fs.existsSync(comp_dir))
		fs.mkdirSync(comp_dir);

	const vue_files: string[] = [];
	dirs.forEach(dir => {
		walk_dir(dir, vue_files);
	});

	const styles: string[] = [];
	vue_files.forEach(filename => {
		const vue = transform_vue(filename);
		const content = [
			"<template>", vue.template, "</template>", "",
			"<script>", vue.script, "</script>",
		].join("\n");
		styles.push(vue.style);
		const final = prettier.format(content, prettier_options);
		const target_name = `${comp_dir}/${vue.component_name}.vue`;
		fs.writeFileSync(target_name, final, "utf8");
		// TODO print build log
	});

	// output css
	fs.writeFileSync(`${dist_dir}/app.css`, prettier.format(styles.join("\n"), {
		parser: "css",
		useTabs: true,
	}), "utf8");
}

