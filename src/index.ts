#!/usr/bin/env nod

import * as FileSystem from "fs";
import * as Path from "path";

import { Config } from "./Config";
import { Dictionary } from "typescript-collections";
import { Helpers } from "./Helpers";
import { IColorGroup } from "./IColorGroup";
import { IKeyValue } from "./IKeyValue";
import { ITheme } from "./ITheme";
import { Theme } from "./Theme";

//https://nodejs.org/api/fs.html

type MainArgs = {
	configDir: string;
	outputDir: string;
};

export class Main {
	private static readonly SASS_EXT: string = ".scss";
	private readonly _initializer: Promise<boolean>;
	private readonly _args: MainArgs;
	private readonly _config: Config;

	public static defaultArgs: MainArgs = {
		configDir: "./",
		outputDir: "./"
	};

	public constructor() {
		this._config = new Config();
		this._args = this._buildArgs() as MainArgs;

		if (this._args.configDir) {
			this._initializer = this._initialize(this._args);
		} else {
			console.error("ERROR: missing dir arg");
		}
	}

	private async _initialize(args: MainArgs): Promise<boolean> {
		await this._config
			.loadAsync(args.configDir)
			.then((results) => {
				this._loadedAsync();
			})
			.catch((error) => {
				console.error(error);
			});

		return true;
	}

	private async _loadedAsync() {
		this._config.themes.forEach((theme) => {
			console.log(theme.name);

			const sass = this._getSass(theme);

			FileSystem.writeFile(`${this._config.outDir}/${this._config.outFile}.scss`, sass, (err) => {
				if (err) {
					return console.log(err);
				}

				console.log("The file was saved!");
			});
		});
	}

	private _getSass(theme: ITheme): string {
		let str = "";

		theme.colors.forEach((color) => {
			const item = <IColorGroup>color;
			console.log(item);

			str += `\$${item.key}:${item.value};`;
		});

		return str;
	}

	private _buildArgs(): MainArgs {
		let obj: object = {};

		process.argv.forEach((val, index) => {
			if (val.indexOf("=") >= 0) {
				const item = val.split("=");
				obj = Object.assign(obj, { [item[0]]: item[1] });
			}
		});

		return <MainArgs>Object.assign(Main.defaultArgs, obj);
	}
}

new Main();
