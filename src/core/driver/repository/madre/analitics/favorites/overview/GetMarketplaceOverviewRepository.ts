import { HttpClient } from '@/src/core/driver/repository/http/httpClient';
import { MarketplaceOverview } from '@/src/core/entitis/madre/analitics/favorites/MarketplaceOverview.entity';
import { IGetMarketplaceOverviewRepository } from 
'@/src/core/adapters/repository/madre/analitics/favorites/items/overview/IGetMarketplaceOverviewRepository';

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