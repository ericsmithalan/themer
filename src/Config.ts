import * as FileSystem from "fs";
import * as Path from "path";

import { IConfig } from "./IConfig";
import { IKeyValue } from "./IKeyValue";
import { ITheme } from "./ITheme";
import { Theme } from "./Theme";
import { rejects } from "assert";

export class Config {
	private static CONFIG_FILE: string = "themer.json";
	private _props: IConfig;
	private _configStr: string;
	private _config: IConfig;
	private _initializer: Promise<boolean>;
	private _themes: ITheme[];

	public static defaultProps: Partial<IConfig> = {
		dir: "./",
		outDir: "./bin",
		js: true,
		ts: true,
		css: true,
		sass: true
	};

	public constructor() {
		this._themes = [];
	}

	public get dir(): string {
		return this._config.dir;
	}

	public get outDir(): string {
		return this._config.outDir;
	}

	public get outFile(): string {
		return this._config.outFile;
	}

	public get isJs(): boolean {
		return this._config.js;
	}

	public get isTs(): boolean {
		return this._config.ts;
	}

	public get isSass(): boolean {
		return this._config.sass;
	}

	public get isCss(): boolean {
		return this._config.css;
	}

	public get settings(): IConfig {
		return this._config;
	}

	public get themes(): ITheme[] {
		return this._themes;
	}

	public async loadAsync(dir: string): Promise<boolean> {
		return await new Promise<boolean>(async (resolve, reject) => {
			await this._findConfigAsync(dir)
				.then((results) => {
					this._config = <IConfig>results;
					resolve(true);
				})
				.catch((error) => {
					reject(error);
					console.error(error);
				});
		});
	}

	private async _findConfigAsync(dir: string): Promise<IConfig> {
		return await new Promise<IConfig>((resolve, reject) => {
			FileSystem.readdir(dir, (err, files) => {
				if (err) {
					reject(err);
				}

				files.forEach(async (file) => {
					if (file.toLowerCase() === Config.CONFIG_FILE) {
						await this._parseConfigAsync(`${dir}/${file}`)
							.then((results) => {
								resolve(results);
							})
							.catch((error) => {
								reject(error);
								console.error(error);
							});
					}
				});
			});
		});
	}

	private async _parseConfigAsync(file: string): Promise<IConfig> {
		return await new Promise<IConfig>((resolve, reject) => {
			FileSystem.readFile(file, (err, data) => {
				if (err) {
					reject(err);
				}

				const json = <IConfig>Object.assign(Config.defaultProps, JSON.parse(data.toString()));

				json.themes.forEach((theme) => {
					const themeObj = new Theme();
					themeObj.name = theme.name;
					themeObj.colors = <IKeyValue<string>[]>theme.colors;
					themeObj.fontFamilies = <IKeyValue<string>[]>theme.fontFamilies;
					themeObj.fontSizes = <IKeyValue<number>[]>theme.fontSizes;

					this.themes.push(themeObj);
				});

				resolve(json);
			});
		});
	}
}
