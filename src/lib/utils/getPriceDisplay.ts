type PriceRange = {
  min: number;
  max: number;
  isSinglePrice: boolean;
};

export function getPriceDisplay(pots: { price: number; }[]): PriceRange {
  if (!pots.length) {
    return { min: 0, max: 0, isSinglePrice: true };
  }

  const prices = pots.map(pot => pot.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return {
    min,
    max,
    isSinglePrice: min === max
  };
} 
