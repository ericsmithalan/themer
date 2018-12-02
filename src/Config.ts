import * as FileSystem from "fs";
import * as Path from "path";

import { File } from "./File";

export interface KeyValue<T> {
	key: string;
	value: T;
}

export interface ConfigProps {
	dir: string;
	outDir: string;
	JS: boolean;
	TS: Boolean;
	CSS: Boolean;
	SASS: boolean;
	colors: Array<KeyValue<string>>;
	fonts: Array<KeyValue<string>>;
}

export class Config {
	private static CONFIG_FILE: string = "themer.json";
	private _props: ConfigProps;
	private _configStr: string;
	private _json: ConfigProps | {};

	public static defaultProps: Partial<ConfigProps> = {
		dir: "./",
		outDir: "./bin",
		JS: true,
		TS: true,
		CSS: true,
		SASS: true
	};

	private _initializer: Promise<boolean>;

	public get json(): ConfigProps | {} {
		return this._json;
	}

	public constructor(dir: string) {
		this._initializer = this._load(dir);
		this._json = {};
	}

	private async _load(dir: string): Promise<boolean> {
		this._props = await new Promise<ConfigProps>((resolve, reject) => {
			FileSystem.readdir(dir, (err, files) => {
				files.forEach(async (file) => {
					if (file.toLowerCase() === Config.CONFIG_FILE) {
						const results = await this._readFile(`${dir}/${file}`);
					}
				});
			});
		});

		return true;
	}

	private async _readFile(file: string): Promise<string> {
		return await new Promise<string>((resolve, reject) => {
			FileSystem.readFile(file, (err, data) => {
				if (err) {
					reject(err);
				}

				this._json = Object.assign(Config.defaultProps, JSON.parse(data.toString()));

				console.log(this._json);

				// if (results != null || results.length > 0) {
				// 	resolve(results);
				// } else {
				// 	reject("file was empty or null");
				// }
			});
		});
	}
}

// {
// 	"dir": "./",
// 	"outDir": "./",
// 	"renderJS": true,
// 	"renderTS": true,
// 	"renderCSS": true,
// 	"renderSASS": true,

// 	"colors": [
// 		{
// 			"baseColors": {
// 				"color1": "#000000",
// 				"color2": "red"
// 			}
// 		},
// 		{
// 			"chromeColors": {
// 				"color1": "#000000",
// 				"color2": "red"
// 			}
// 		},
// 		{
// 			"accentColors": {
// 				"color1": "#000000",
// 				"color2": "red"
// 			}
// 		}
// 	],
// 	"fonts": []
// }
