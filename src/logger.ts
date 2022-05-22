/* istanbul ignore file */
import chalk from "chalk";

const error = chalk.bold.bgRedBright.blackBright,
	info = chalk.bold.bgGreenBright.blackBright,
	warn = chalk.bold.bgYellowBright.blackBright;

const comp = chalk.underline.blueBright,
	file = chalk.underline.magentaBright;

const ERROR = error(" ERROR "),
	INFO = info(" INFO "),
	WARN = warn(" WARN ");

const BACKTICK = '"`"';

export const finish = (component:string, filename: string) => {
	console.log(`${INFO} ${comp(component)} has been transformed from ${file(filename)}`);
};

export const backtick = (filename: string) => {
	console.log(`${ERROR} ${file(filename)} contains ${error(BACKTICK)}, please modify this file manually, it will not be transformed`);
};

export const dup = (component: string, filename: string) => {
	console.log(`${WARN} ${comp(component)} exists, it will be overrided from ${file(filename)}`);
};

export const dist_exist = (path: string) => {
	console.log(`${ERROR} ${file(path)} exists, please remove it manually`);
};

