export type Marketplace = {
  id: number;
  name: string;
};

export interface MarketplaceFavoriteProduct {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  soldQuantity: number;
  visits: number;
  revenue: number;
  seller_sku: string;
  marketplaces: any[];
}