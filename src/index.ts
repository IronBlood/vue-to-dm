import fs from "fs";
import appRoot from "app-root-path";
import prettier, { Options as PrettierOptions } from "prettier";
import { walk_dir } from "./file";
import { transform_vue } from "./transform";
import * as logger from "./logger";

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

	for (const p of [ comp_dir, dist_dir ]) {
		if (fs.existsSync(p)) {
			logger.dist_exist(p);
			return;
		}
	}

	fs.mkdirSync(dist_dir);
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

		if (vue.template.indexOf("`") >= 0) {
			logger.backtick(filename);
		}

		if (vue.style)
			styles.push(vue.style);

		const final = prettier.format(content, prettier_options);
		const target_name = `${comp_dir}/${vue.component_name}.vue`;

		if (fs.existsSync(target_name)) {
			logger.dup(vue.component_name, filename);
		}

		fs.writeFileSync(target_name, final, "utf8");

		logger.finish(vue.component_name, filename);
	});

	// output css
	fs.writeFileSync(`${dist_dir}/app.css`, prettier.format(styles.join("\n"), {
		parser: "css",
		useTabs: true,
	}), "utf8");
}

