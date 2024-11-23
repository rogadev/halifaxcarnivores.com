/**
 * Formats a number as USD currency
 * @param amount - The amount to format
 * @returns A formatted string like "$29.99"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
} 
