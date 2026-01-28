import { IGetMegatoneProductsRepository } from '@/src/core/adapters/repository/marketplace/megatone/products/get/IGetMegatoneProductRepository';
import { HttpClient } from '../../../../http/httpClient';
import { MarketplaceProduct } from '@/src/core/entitis/marketplace/shared/products/get/MarketplaceProduct';
import { PaginatedResult } from '@/src/core/entitis/marketplace/shared/products/get/pagination/PaginatedResult';

type MegatoneProductsApiResponse = {
  items: MarketplaceProduct[];
  total: number;
  limit: number;
  offset: number;
  hasNext?: boolean;
  nextOffset?: number;
};

export class GetMegatoneProductsRepository
  implements IGetMegatoneProductsRepository
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
      await this.http.get<MegatoneProductsApiResponse>(
        `/megatone/products?offset=${offset}&limit=${limit}`
      );

    return {
      items: response.items,
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