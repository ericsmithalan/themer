export class Helpers {
    public static stripComments(str: string): string {
        const regex = /(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>)/g;
        const clean = str.replace(regex, "");

        return clean.trim();
    }

    public static toCamelCase(str: string): string {
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

    public static stripSpace(str: string): string {
        const regex = /^\s+|\s+$/g;
        const clean = str.replace(regex, "");

        return clean.trim();
    }

    public static stripLines(str: string): string {
        const regex = /(\r\n|\n|\r)/gm;
        const clean = str.replace(regex, "");

        return clean.trim();
    }
}
