import { IColorGroup } from "./IColorGroup";
import { IKeyValue } from "./IKeyValue";

export interface ITheme {
	name: string;
	colors: IColorGroup[];
	fontFamilies: IKeyValue<string>[];
	fontSizes: IKeyValue<number>[];
}
