import { MarketplaceOverview } from "./MarketplaceOverview.entity";

export type MarketplaceBrandBreakdown = {
  brand: string;
  totalProducts: number | string;
};

export type MarketplaceCategoryBreakdown = {
  categoryId: string;
  categoryName: string;
  level: number;
  totalProducts: number | string;
  fullPath: string;
};

export type MarketplaceFullOverview = {
  overview: MarketplaceOverview;
  brands: MarketplaceBrandBreakdown[];
  categories: MarketplaceCategoryBreakdown[];
};