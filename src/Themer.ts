#!/usr/bin/env nod

import * as Path from "path";
import * as fs from "fs";

import { Dictionary } from "typescript-collections";
import { Helpers } from "./Helpers";

export interface ThemerProps {
	files: Dictionary<string, string>;
}

export class Themer {
	private COLOR_ROOT_KEY: string = "//@themer: colors";
	private FONT_ROOT_KEY: string = "//@themer: fonts";

	private readonly _props: ThemerProps;
	private readonly _colors: Dictionary<string, string>;
	private readonly _fonts: Dictionary<string, string>;

	public constructor(props?: ThemerProps) {
		this._props = props;
		this._colors = new Dictionary<string, string>();
		this._fonts = new Dictionary<string, string>();
	}

	public async create(files: Dictionary<string, string>): Promise<boolean> {
		return await new Promise<boolean>((resolve, reject) => {
			if (files) {
				files.forEach((key, value) => {
					const dirtyStr = value;
				});
			}
		});
	}
}
