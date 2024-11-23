import type { Plant, Soil, Terrarium } from '@prisma/client';

export type DisplayedPlantItem = Pick<
  Plant,
  | 'id'
  | 'displayName'
  | 'description'
  | 'featuredImage'
  | 'price'
  | 'salePrice'
  | 'isOnSale'
  | 'careLight'
  | 'careWater'
  | 'careHumidity'
  | 'careTemperature'
  | 'qtyAvailable'
  | 'size'
  | 'currentSize'
  | 'maxSize'
  | 'petFriendly'
> & {
  // Derived fields not directly from Plant model
  isComingSoon: boolean;
  isNewItem: boolean;
};

export type CartItemType = {
  id: string; // Unique ID for DOM purposes
  quantity: number;
  orderStatus: 'pending' | 'ordered';
  orderId?: string;
  item: Plant | Soil | Terrarium;
};

export interface Cart {
  items: CartItemType[];
  lastOrderId?: string;
}
