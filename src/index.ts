#!/usr/bin/env nod

import * as FileSystem from "fs";
import * as Path from "path";

import { Config } from "./Config";
import { Dictionary } from "typescript-collections";
import { Helpers } from "./Helpers";
import { Themer } from "./Themer";

//https://nodejs.org/api/fs.html

type MainArgs = {
	dir: string;
};

export class Main {
	private static readonly SASS_EXT: string = ".scss";

	private _config: Config;

	private _filesDictionary: Dictionary<string, string>;
	private _initializer: Promise<boolean>;

	public constructor() {
		const args = this._processArgs() as MainArgs;

		if (args.dir) {
			this._initializer = this._initialize(args);
		} else {
			console.error("ERROR: missing dir arg");
		}
	}

	private async _load(results: Dictionary<string, string>, args: MainArgs) {
		Helpers.logTask("PARSING");
		this._filesDictionary = results;

		const themer = new Themer();
		await themer.create(this._filesDictionary);

		Helpers.logTask("DONE");
	}

	private async _initialize(args: MainArgs): Promise<boolean> {
		this._config = new Config(args.dir);

		return true;
	}

	private _processArgs(): MainArgs {
		let obj: Partial<MainArgs> = {};

		process.argv.forEach((val, index) => {
			if (val.indexOf("=") >= 0) {
				const item = val.split("=");
				Object.assign(obj, { [item[0]]: item[1] });
			}
		});

		return obj as MainArgs;
	}
}

new Main();
