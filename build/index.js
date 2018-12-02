#!/usr/bin/env nod
import * as fs from "fs";
import { Dictionary } from "typescript-collections";
export class Themer {
    constructor() {
        this._filesDir = "./src/";
        this._fileName = "colors";
        this._fileExt = "scss";
        this._sassColorList = new Dictionary();
        this._getFileContentString().then((results) => {
            this._loaded(results);
        });
    }
    get fullPath() {
        return `${this._filesDir}${this._fileName}.${this._fileExt}`;
    }
    _loaded(results) {
        this._dirtyResults = results;
        this._cleanResults = this._clean(results);
        const resultList = this._cleanResults.split(";");
        resultList.forEach((item) => {
            const styleList = item.split(":");
            this._sassColorList.setValue(styleList[0], styleList[1]);
        });
        console.log("");
        console.log("-- FINAL LIST");
        console.log(this._sassColorList.toString());
        console.log("");
    }
    _clean(results) {
        let clean = "";
        console.log("-- DIRTY");
        console.log(this._dirtyResults);
        console.log("");
        console.log("-- REMOVE COMMENTS");
        clean = this._stripComments(results);
        console.log("");
        console.log("-- REMOVE LINES");
        clean = this._stripLines(clean);
        console.log("");
        console.log("-- REMOVE SPACES");
        clean = this._stripComments(clean);
        console.log("");
        return clean;
    }
    _stripComments(str) {
        const regex = /(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>)/g;
        const clean = str.replace(regex, "");
        console.log(clean);
        return clean;
    }
    _stripSpace(str) {
        const regex = /\s+/g;
        const clean = str.replace(regex, "");
        console.log(clean);
        return clean;
    }
    _stripLines(str) {
        const regex = /(\r\n|\n|\r)/gm;
        const clean = str.replace(regex, "");
        console.log(clean);
        return clean;
    }
    _getFileContentString() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fullPath, function (err, data) {
                if (err) {
                    reject(err);
                }
                const results = data.toString();
                if (results != null || results.length > 0) {
                    resolve(results);
                }
                else {
                    reject("file was empty or null");
                }
            });
        });
    }
    _getSassColors() {
        return "";
    }
}
new Themer();
//# sourceMappingURL=index.js.map