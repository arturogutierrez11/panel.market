import { IGetMegatoneProductsStatusRepository } from '@/src/core/adapters/repository/marketplace/megatone/products/status/IGetMegatoneProductsStatusRepository';
import { MarketplaceProductsStatus } from '@/src/core/entitis/marketplace/shared/products/status/MarketplaceProductsStatus';
import { HttpClient } from '../../../../http/httpClient';

type ApiResponse = Array<{
  status: string;
  total: string;
}>;

export class StatusMegatoneProductRepository
  implements IGetMegatoneProductsStatusRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(params?: {
    status?: 'ACTIVE' | 'PAUSED' | 'DELETED';
  }): Promise<MarketplaceProductsStatus[]> {
    const response = await this.http.get<ApiResponse>(
      `/api/internal/marketplace/products/megatone/status`
    );

    const mapped = response.map(item => ({
      status: item.status as MarketplaceProductsStatus['status'],
      total: Number(item.total),
    }));

    if (params?.status) {
      return mapped.filter(i => i.status === params.status);
    }

    return mapped;
  }
}