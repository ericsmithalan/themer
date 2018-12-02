#!/usr/bin/env nod

import * as FileSystem from "fs";
import * as Path from "path";

import { Dictionary } from "typescript-collections";
import { Helpers } from "./Helpers";
import { Themer } from "./Themer";
import { stringify } from "querystring";

//https://nodejs.org/api/fs.html

export interface MainArgs {
    dir: string;
}

export class Main {
    private readonly _args: MainArgs;
    private static readonly SASS_EXT: string = ".scss";
    public static defaultArgs: Partial<MainArgs> = {
        dir: "./src/scss/"
    };

    private _filesDictionary: Dictionary<string, string>;

    private _initializer: Promise<boolean>;

    public constructor(args?: MainArgs) {
        this._args = this._processArgs(args);
        this._initializer = this._initialize();
    }

    private async _initialize(): Promise<boolean> {
        console.log("loading...");
        await this._readDir(this._args.dir).then((results) => {
            this._load(results);
        });

        return true;
    }

    private _processArgs(args?: MainArgs): MainArgs {
        let obj: object = args || {};

        process.argv.forEach((val, index) => {
            if (val.indexOf("=") >= 0) {
                const item = val.split("=");
                Object.assign(obj, { [item[0]]: item[1] });
            }
        });

        return obj as MainArgs;
    }

    private _load(results) {
        this._filesDictionary = results;

        console.log(this._filesDictionary.toString());
    }

    private async _readDir(path: string): Promise<Dictionary<string, string>> {
        const self = this;
        const fileDictionary = new Dictionary<string, string>();

        return await new Promise<Dictionary<string, string>>((resolve, reject) => {
            FileSystem.readdir(path, (err, files) => {
                if (err) {
                    reject(err);
                }

                if (files && files.length > 0) {
                    files.forEach(async (file) => {
                        if (Path.extname(file) === Main.SASS_EXT) {
                            const results = await self._readFile(`${path}/${file}`);
                            fileDictionary.setValue(file, results);
                        }
                    });

                    resolve(fileDictionary);
                } else {
                    reject(`no files found in ${path}`);
                }
            });
        });
    }

    private async _readFile(file: string): Promise<string> {
        const self = this;
        return await new Promise<string>((resolve, reject) => {
            FileSystem.readFile(file, function(err, data) {
                if (err) {
                    reject(err);
                }

                console.log(`reading file ${file}`);

                const results = data.toString();

                if (results != null || results.length > 0) {
                    resolve(results);
                } else {
                    reject("file was empty or null");
                }
            });
        });
    }
}

new Main();
