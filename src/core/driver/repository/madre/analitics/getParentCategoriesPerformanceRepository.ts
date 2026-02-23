import { HttpClient } from '@/src/core/driver/repository/http/httpClient';

type ParentPerformance = {
  categoryId: string;
  categoryName: string;
  visits: number;
  orders: number;
  revenue: number;
};

export class GetParentCategoriesPerformanceRepository {
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(): Promise<ParentPerformance[]> {
    return this.http.get(
      `/api/analytics/categories/parents-performance?orderBy=visits&direction=desc`
    );
  }
}