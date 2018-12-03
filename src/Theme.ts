import * as Path from "path";
import * as fs from "fs";

import { Helpers } from "./Helpers";
import { IColorGroup } from "./IColorGroup";
import { IConfig } from "./IConfig";
import { IKeyValue } from "./IKeyValue";
import { ITheme } from "./ITheme";

export class Theme implements ITheme {
	private _name: string;
	private _colors: IColorGroup[];
	private _fontFamilies: IKeyValue<string>[];
	private _fontSizes: IKeyValue<number>[];

	public constructor() {}

	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
	}

	public get colors(): IColorGroup[] {
		return this._colors;
	}
	public set colors(value: IColorGroup[]) {
		this._colors = value;
	}

	public get fontFamilies(): IKeyValue<string>[] {
		return this._fontFamilies;
	}

	public set fontFamilies(value: IKeyValue<string>[]) {
		this._fontFamilies = value;
	}

	public get fontSizes(): IKeyValue<number>[] {
		return this._fontSizes;
	}

	public set fontSizes(value: IKeyValue<number>[]) {
		this._fontSizes = value;
	}
}
