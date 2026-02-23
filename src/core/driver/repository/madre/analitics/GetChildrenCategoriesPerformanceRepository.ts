import { HttpClient } from '@/src/core/driver/repository/http/httpClient';

export type CategoryPerformanceItem = {
  categoryId: string;
  categoryName: string;
  totalProducts: number;
  visits: number;
  orders: number;
  revenue: number;
};

export type CategoryPerformanceSummary = {
  totalProducts: number;
  totalVisits: number;
  totalOrders: number;
  totalRevenue: number;
};

export type CategoryHierarchyResponse = {
  summary: CategoryPerformanceSummary;
  items: CategoryPerformanceItem[];
};

export class GetChildrenCategoriesPerformanceRepository {
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(parentId?: string | null): Promise<CategoryHierarchyResponse> {
    const query = parentId ? `?parentId=${parentId}` : '';

    return this.http.get<CategoryHierarchyResponse>(
      `/api/analytics/categories/children${query}`
    );
  }
}