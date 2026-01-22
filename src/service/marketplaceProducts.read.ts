'use server'
import { madreApi } from './madreApi';

export type ProductStatusSummary = {
  status: 'ACTIVE' | 'PAUSED' | 'DELETED';
  total: string;
};

export async function getMarketplaceProductStatus(
  marketplace: string
): Promise<ProductStatusSummary[]> {
  return madreApi<ProductStatusSummary[]>(
    `/api/internal/marketplace/products/${marketplace}/status`
  );
}