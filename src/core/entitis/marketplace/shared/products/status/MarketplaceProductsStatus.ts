export type MarketplaceProductStatus =
  | 'ACTIVE'
  | 'PAUSED'
  | 'DELETED';

export type MarketplaceProductsStatus = {
  status: MarketplaceProductStatus;
  total: number;
};