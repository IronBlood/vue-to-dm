import fs from "fs";

/**
 * Get all .vue files under a directory recursively.
 */
export const walk_dir = (path: string, filelist: string[] = []) => {
	const files = fs.readdirSync(path);
	for (const f of files) {
		const f_path = `${path}/${f}`;
		if (fs.statSync(f_path).isDirectory()) {
			walk_dir(f_path, filelist);
		} else if (/\.vue$/.test(f)) {
			filelist.push(f_path);
		}
	}
	return filelist;
}

