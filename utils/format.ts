/**
 * Formats a number according to Canadian locale standards
 * @param value - The number to format, or undefined
 * @param fallback - Optional fallback value if the input is undefined (defaults to 0)
 * @returns Formatted string representation of the number
 */
export function formatToLocaleNumber(value?: number | null, fallback: number = 0): string {
  return new Intl.NumberFormat('en-CA').format(value ?? fallback);
} 
