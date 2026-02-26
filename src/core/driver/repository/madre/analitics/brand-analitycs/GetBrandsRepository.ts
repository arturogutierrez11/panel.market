import { IGetBrandsRepository } from "@/src/core/adapters/repository/madre/analitics/brands-analitycs/IGetBrandsRepository";
import { HttpClient } from "@/src/core/driver/repository/http/httpClient";
import { Brand, PaginatedBrands } from "@/src/core/entitis/madre/analitics/brands-analitycs/Brand";

export class GetBrandsRepository implements IGetBrandsRepository {
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async getPaginated(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedBrands> {

    const {
      page = 1,
      limit = 20,
    } = params || {};

    const endpoint =
      `/api/analytics/brands?page=${page}&limit=${limit}&orderBy=orders&direction=desc`;

    const response = await this.http.get<{
      meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
      items: {
        brand: string;
        totalProducts: number;
        totalOrders: number;
        totalVisits: number;
      }[];
    }>(endpoint);

    return {
      meta: response.meta,
      items: response.items.map((b) => ({
        name: b.brand,
        totalProducts: b.totalProducts,
        totalOrders: b.totalOrders,
        totalVisits: b.totalVisits,
      })),
    };
  }

  async search(query: string): Promise<Brand[]> {
    const endpoint =
      `/api/analytics/products/brands?q=${encodeURIComponent(query)}`;

    const response = await this.http.get<{ brand: string }[]>(endpoint);

    return response.map((b) => ({
      name: b.brand,
    }));
  }
}