import type { Plant } from '@prisma/client';

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
  | 'size'
  | 'currentSize'
  | 'maxSize'
  | 'petFriendly'
> & {
  // Derived fields not directly from Plant model
  isComingSoon: boolean;
  isNewItem: boolean;
};
