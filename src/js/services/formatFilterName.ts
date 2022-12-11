/**
 * Format Filter sting to lowercase & remove accents
 * @param value 
 * @returns formated string
 */
export default function formatFilterName(value: string): string {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}