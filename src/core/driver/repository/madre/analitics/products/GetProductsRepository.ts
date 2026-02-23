import { HttpClient } from '@/src/core/driver/repository/http/httpClient';
import {
  IGetProductsRepository,
  GetProductsFilters,
  ProductsResponse,
} from '@/src/core/adapters/repository/madre/analitics/products/IGetProductsRepository';

export class GetProductsRepository implements IGetProductsRepository {
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(filters: GetProductsFilters): Promise<ProductsResponse> {
    const query = new URLSearchParams();

    const finalFilters: GetProductsFilters = {
      ...filters,
      minVisits:
        filters.minVisits !== undefined &&
        filters.minVisits !== null
          ? filters.minVisits
          : 1,
    };

    Object.entries(finalFilters).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ''
      ) {
        query.append(key, String(value));
      }
    });

    return this.http.get<ProductsResponse>(
      `/api/analytics/products?${query.toString()}`
    );
  }
}