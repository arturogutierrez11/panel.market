import { IUpdateMarketplaceStatusRepository } from '@/src/core/adapters/repository/madre/analitics/favorites/folders/status/IUpdateMarketplaceStatusRepository';
import { HttpClient } from '@/src/core/driver/repository/http/httpClient';

export class UpdateMarketplaceStatusRepository
  implements IUpdateMarketplaceStatusRepository
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
    id: number,
    status: 'active' | 'closed'
  ): Promise<{ success: boolean }> {
    return this.http.patch<{ success: boolean }>(
      `/api/analytics/marketplace-favorites/marketplaces/${id}/status`,
      { status }
    );
  }
}