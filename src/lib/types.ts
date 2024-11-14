import type { Pot } from '@prisma/client';

export type DisplayedPlantItem = {
  id: number;
  name: string;
  description: string;
  tags: string[];
  featuredImage?: string;
  images: string[];
  minPrice: number;
  maxPrice: number;
  isNewItem: boolean;
  isOnSale: boolean;
  isComingSoon: boolean;
  pots: Pot[];
  water?: string;
  light?: string;
  temperature?: string;
  humidity?: string;
  seasonality?: string;
};
