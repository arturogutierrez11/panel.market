export type MarketplaceOverview = {
  totalProducts: number;
  totalVisits: number;
  totalOrders: number;
  totalRevenue: number;
  avgPrice: number;
  avgTicket: number;
  totalBrands: number;
  totalCategories: number;
};

export type MarketplaceBrandBreakdown = {
  brand: string;
  totalProducts: number;
};

export type MarketplaceCategoryBreakdown = {
  categoryId: string;
  totalProducts: number;
};

export type MarketplaceFullOverview = {
  overview: MarketplaceOverview;
  brands: MarketplaceBrandBreakdown[];
  categories: MarketplaceCategoryBreakdown[];
};