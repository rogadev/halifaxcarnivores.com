export interface Plant {
  id: number;
  name: string;
  genus: string;
  species: string;
  unique: string;
  price: number;
  salePrice: number;
  cost: number;
  quantity: number;
  new: boolean;
  onSale: boolean;
  images: string[];
  description?: string;
  water?: string;
  light?: string;
  temperature?: string;
  humidity?: string;
  seasonality?: string;
  climateZoneId: number;
  climateZone: {
    id: number;
  };
  createdAt: Date;
  updatedAt: Date;
} 
