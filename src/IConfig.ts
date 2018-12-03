import { ITheme } from "./ITheme";

export interface IConfig {
	dir: string;
	outDir: string;
	outFile: string;
	js: boolean;
	ts: boolean;
	css: boolean;
	sass: boolean;
	themes: Array<ITheme>;
}
