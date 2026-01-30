import { MarketplaceProductsStatus } from '@/src/core/entitis/marketplace/shared/products/status/MarketplaceProductsStatus';

export interface IGetOncityProductsStatusRepository {
  execute(params?: {
    status?: 'ACTIVE' | 'PAUSED' | 'DELETED';
  }): Promise<MarketplaceProductsStatus[]>;
}