import { IGetMarketplaceOverviewRepository } from '@/src/core/adapters/repository/madre/analitics/favorites/folders/overview/IGetMarketplaceOverviewRepository';
import { HttpClient } from '@/src/core/driver/repository/http/httpClient';
import { MarketplaceOverview } from '@/src/core/entitis/madre/analitics/favorites/MarketplaceOverview.entity';

export class GetMarketplaceOverviewRepository
  implements IGetMarketplaceOverviewRepository
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
    marketplaceId: number
  ): Promise<MarketplaceOverview> {
    return this.http.get(
      `/api/analytics/marketplace-favorites/${marketplaceId}/overview`
    );
  }
}