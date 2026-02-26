import { IGetCategoriesPerformanceRepository } from "@/src/core/adapters/repository/madre/analitics/categories-analitycs/IGetCategoriesPerformanceRepository";
import { HttpClient } from "../../http/httpClient";
import { CategoryPerformance } from "@/src/core/entitis/madre/analitics/CategoryPerformance";

export class GetCategoriesPerformanceRepository
  implements IGetCategoriesPerformanceRepository
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
    categoryId?: string;
    orderBy?: 'visits' | 'orders' | 'conversion' | 'revenue';
    direction?: 'asc' | 'desc';
  }): Promise<CategoryPerformance[]> {
    const query = new URLSearchParams();

    if (params.categoryId)
      query.append('categoryId', params.categoryId);

    if (params.orderBy)
      query.append('orderBy', params.orderBy);

    if (params.direction)
      query.append('direction', params.direction);

    return this.http.get<CategoryPerformance[]>(
      `/api/analytics/categories?${query.toString()}`
    );
  }
}