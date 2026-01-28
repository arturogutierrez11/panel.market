import { IGetMegatoneProductsRepository } from '@/src/core/adapters/repository/marketplace/megatone/products/get/IGetMegatoneProductRepository';
import { HttpClient } from '../../../../http/httpClient';
import { MarketplaceProduct } from '@/src/core/entitis/marketplace/shared/products/get/MarketplaceProduct';
import { PaginatedResult } from '@/src/core/entitis/marketplace/shared/products/get/pagination/PaginatedResult';

type MegatoneProductsApiResponse = {
  items: Array<
    MarketplaceProduct & {
      linkPublicacion?: string;
      publication_url?: string;
    }
  >;
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

    /* =========================
     * Normalización
     * ========================= */
   const normalizedItems: MarketplaceProduct[] =
  response.items.map((item: any) => ({
    ...item,

    publicationUrl:
      item.publicationUrl ??
      item.linkPublicacion ??
      item.LinkPublicacion ??
      item.link_publicacion ??
      item.publication_url ??
      item.permalink ??
      item.url ??
      undefined,
  }));
    /* =========================
     * Orden por estado
     * ========================= */
    const statusOrder: Record<string, number> = {
      ACTIVE: 0,
      PAUSED: 1,
      DELETED: 2,
    };

    const sortedItems = normalizedItems.sort(
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