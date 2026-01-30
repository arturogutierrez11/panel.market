import { MarketplaceProductsStatus } from '@/src/core/entitis/marketplace/shared/products/status/MarketplaceProductsStatus';

export interface IGetMegatoneProductsStatusRepository {
  execute(params?: {
    status?: 'ACTIVE' | 'PAUSED' | 'DELETED';
  }): Promise<MarketplaceProductsStatus[]>;
}