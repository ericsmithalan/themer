#!/usr/bin/env nod

import * as fs from "fs";
import { Dictionary } from "typescript-collections";

export class Themer {
    private readonly _filesDir: string;
    private readonly _fileName: string;
    private readonly _fileExt: string;

    private readonly _sassColorList: Dictionary<string, string>;
    private _dirtyResults: string;
    private _cleanResults: string;

    public constructor() {
        this._filesDir = "./src/";
        this._fileName = "colors";
        this._fileExt = "scss";
        this._sassColorList = new Dictionary<string, string>();

        this._getFileContentString().then((results) => {
            this._loaded(results);
        });
    }

    public get fullPath(): string {
        return `${this._filesDir}${this._fileName}.${this._fileExt}`;
    }

    private _loaded(results: string) {
        this._dirtyResults = results;
        this._cleanResults = this._clean(results);

        const resultList = this._cleanResults.split(";");

        resultList.forEach((item) => {
            const styleList = item.split(":");
            const name = this._toCamelCase(styleList[0]);
            const value = styleList[1];

            this._sassColorList.setValue(name, value);
        });

        this._sassColorList.forEach((key, item) => {
            console.log(key, item);
        });
    }

    private _clean(results: string): string {
        let clean = "";

        clean = this._stripComments(results);
        clean = this._stripLines(clean);
        clean = this._stripSpace(clean);

        return clean;
    }

    private _stripComments(str: string): string {
        const regex = /(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>)/g;
        const clean = str.replace(regex, "");

        return clean.trim();
    }

    private _stripSpace(str: string): string {
        const regex = /^\s+|\s+$/g;
        const clean = str.replace(regex, "");

        return clean.trim();
    }

    private _toCamelCase(str: string): string {
        const regexLetterAfterDash = /\-[a-z]/g;
        const regexLetterAfterDollar = /\$[A-Z]/g;
        const regexDash = /-/g;
        const regexDollar = /\$/g;

        let clean = str
            .replace(regexLetterAfterDash, (chr) => {
                return chr.toUpperCase();
            })
            .replace(regexDash, "")
            .replace(regexLetterAfterDollar, (chr) => {
                return chr.toLowerCase();
            })
            .replace(regexDollar, "");

        return clean.trim();
    }

    private _stripLines(str: string): string {
        const regex = /(\r\n|\n|\r)/gm;
        const clean = str.replace(regex, "");

        return clean.trim();
    }

    private _getFileContentString(): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fullPath, function(err, data) {
                if (err) {
                    reject(err);
                }

                const results = data.toString();

                if (results != null || results.length > 0) {
                    resolve(results);
                } else {
                    reject("file was empty or null");
                }
            });
        });
    }

    private _getSassColors(): string {
        return "";
    }
}

new Themer();
