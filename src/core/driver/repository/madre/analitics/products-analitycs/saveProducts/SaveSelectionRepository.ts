import { ISaveSelectionRepository } from '@/src/core/adapters/repository/madre/analitics/products-analitycs/saveproducts/ISaveSelectionRepository';
import { HttpClient } from '@/src/core/driver/repository/http/httpClient';
import { ProductsFilters } from '@/src/core/entitis/madre/analitics/products-analitycs/ProductsFilters';

export class SaveSelectionRepository
  implements ISaveSelectionRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(
    marketplaceId: number,
    filters: ProductsFilters
  ): Promise<{
    success: boolean;
    totalProducts: number;
  }> {
    return this.http.post(
      '/api/analytics/products/save-selection',
      {
        marketplaceId,
        filters,
      }
    );
  }
}