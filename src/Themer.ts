#!/usr/bin/env nod

import * as fs from "fs";
import * as Path from "path";

import { Dictionary } from "typescript-collections";
import { Helpers } from "./Helpers";

export interface ThemerProps {
    scssDir: string;
}

export class Themer {
    private readonly _props: ThemerProps;
    public static defaultProps: ThemerProps = {
        scssDir: "./scss/"
    };

    private readonly _fileName: string;
    private readonly _fileExt: string;

    private readonly _sassColorList: Dictionary<string, string>;
    private _dirtyResults: string;
    private _cleanResults: string;

    public constructor(props?: ThemerProps) {
        this._props = Object.assign(Themer.defaultProps, props || {});
        this._sassColorList = new Dictionary<string, string>();
    }

    private _loaded(results: string) {
        // this._dirtyResults = results;
        // this._cleanResults = this._clean(results);
        // const resultList = this._cleanResults.split(";");
        // resultList.forEach((item) => {
        //     const styleList = item.split(":");
        //     const name = Helpers.toCamelCase(styleList[0]);
        //     const value = styleList[1];
        //     this._sassColorList.setValue(name, value);
        // });
        // this._sassColorList.forEach((key, item) => {
        //     console.log(key, item);
        // });
    }

    private _clean(results: string): string {
        // let clean = "";
        // clean = Helpers.stripComments(results);
        // clean = Helpers.stripLines(clean);
        // clean = Helpers.stripSpace(clean);
        // return clean;
        return "";
    }

    private _getSassColors(): string {
        return "";
    }

    private _getFileContentString(): Promise<string> {
        return new Promise((resolve, reject) => {
            // fs.readFile(this.fullPath, function(err, data) {
            //     if (err) {
            //         reject(err);
            //     }
            //     const results = data.toString();
            //     if (results != null || results.length > 0) {
            //         resolve(results);
            //     } else {
            //         reject("file was empty or null");
            //     }
            // });
        });
    }
}
