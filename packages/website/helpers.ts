import { regex, diacriticChars } from "data";

export const reduceSpaces = (str: string) => str.replace(regex.removeExtraSpaces, " ").trim();

export const compareSearch = (term: string, text: string) => {
    const cleanTerm = term
        .toLowerCase()
        .replace(regex.sanitizeString, c => diacriticChars[c] || "");

    const cleanText = reduceSpaces(
        text.toLowerCase().replace(regex.sanitizeString, c => diacriticChars[c] || "")
    );

    return cleanTerm.startsWith(cleanText);
};
