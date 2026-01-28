import { MarketplaceProduct } from '@/src/core/entitis/marketplace/shared/products/get/MarketplaceProduct';
import { PaginatedResult } from '@/src/core/entitis/marketplace/shared/products/get/pagination/PaginatedResult';
import { HttpClient } from '../../../../http/httpClient';
import { IGetOncityProductsRepository } from '@/src/core/adapters/repository/marketplace/oncity/products/get/IGetOncityProductRepository';

type OncityProductsApiResponse = {
  items: MarketplaceProduct[];
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
        baseUrl: process.env.NEXT_PUBLIC_MARKETPLACE_API_URL!,
      });
  }

  async execute(params: {
    offset: number;
    limit: number;
  }): Promise<PaginatedResult<MarketplaceProduct>> {
    const { offset, limit } = params;

    const response =
      await this.http.get<OncityProductsApiResponse>(
        `/oncity/products/all?offset=${offset}&limit=${limit}`
      );

    const statusOrder: Record<string, number> = {
      ACTIVE: 0,
      PAUSED: 1,
      DELETED: 2,
    };

    const sortedItems = [...response.items].sort(
      (a, b) =>
        (statusOrder[a.status] ?? 99) -
        (statusOrder[b.status] ?? 99)
    );

    return {
      items: sortedItems,
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