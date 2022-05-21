import fs from "fs";
import path from "path";
import appRoot from "app-root-path";

const is_vue_file = (filename: string): boolean => /\.vue$/.test(filename);

/**
 * Get all .vue files under a directory recursively.
 */
export const walk_dir = (path: string, filelist: string[] = []) => {
	const files = fs.readdirSync(path);
	for (const f of files) {
		const f_path = `${path}/${f}`;
		if (fs.statSync(f_path).isDirectory()) {
			walk_dir(f_path, filelist);
		} else if (is_vue_file(f_path)) {
			filelist.push(f_path);
		}
	}
	return filelist;
}

export interface ResolveFileOption {
	filename: string;
	basepath: string;
}

export const resolve_file = ({ filename, basepath }: ResolveFileOption): string | null => {
	if (is_vue_file(filename)) {
		if (/^@\//.test(filename))
			return filename.replace("@", `${appRoot}/src`);
		if (/^\./.test(filename)) {
			const fullpath = path.resolve(basepath, filename);
			return fullpath.replace(path.resolve("."), ".");
		}
	}
	return null;
}

