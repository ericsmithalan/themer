#!/usr/bin/env nod
export declare class Themer {
    private readonly _filesDir;
    private readonly _fileName;
    private readonly _fileExt;
    private readonly _sassColorList;
    private _dirtyResults;
    private _cleanResults;
    constructor();
    readonly fullPath: string;
    private _loaded;
    private _clean;
    private _stripComments;
    private _stripSpace;
    private _stripLines;
    private _getFileContentString;
    private _getSassColors;
}
