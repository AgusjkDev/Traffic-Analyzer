export const removeExtraSpaces = /\s{2,}/g;
export const streetName = /^[\p{L}.'-]+(?:\s[\p{L}.'-]+)*$/u;
export const sanitizeString = /[^a-zA-Z\s]/g;
export const uuid =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
