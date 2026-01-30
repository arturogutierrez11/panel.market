import { IGetOncityProductsRepository } from '@/src/core/adapters/repository/marketplace/oncity/products/get/IGetOncityProductRepository';
import { MarketplaceProduct } from '@/src/core/entitis/marketplace/shared/products/get/MarketplaceProduct';
import { PaginatedResult } from '@/src/core/entitis/marketplace/shared/products/get/pagination/PaginatedResult';
import { HttpClient } from '../../../../http/httpClient';
import { mapRawPayloadToMarketplaceProduct } from '../../../mapper/mapRawPayloadToMarketplaceProduct';

type OncityApiResponse = {
  items: Array<{
    raw_payload: any;
  }>;
  total: number;
  limit: number;
  offset: number;
  hasNext?: boolean;
  nextOffset?: number;
};

export class GetOncityProductsRepository
  implements IGetOncityProductsRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

async execute(params: {
  offset: number;
  limit: number;
}): Promise<PaginatedResult<MarketplaceProduct>> {
  const { offset, limit } = params;

  const response = await this.http.get<OncityApiResponse>(
    `/api/internal/marketplace/products/items/all?marketplace=oncity&offset=${offset}&limit=${limit}`
  );

  const items = response.items
    .map(item => mapRawPayloadToMarketplaceProduct(item.raw_payload))
    .sort((a, b) => {
      const order: Record<MarketplaceProduct['status'], number> = {
        ACTIVE: 0,
        PAUSED: 1,
        DELETED: 2,
      };

      return order[a.status] - order[b.status];
    });

  return {
    items,
    total: response.total,
    limit: response.limit,
    offset: response.offset,
    hasNext:
      response.hasNext ??
      response.offset + response.limit < response.total,
    nextOffset:
      response.nextOffset ??
      response.offset + response.limit,
  };
}
}