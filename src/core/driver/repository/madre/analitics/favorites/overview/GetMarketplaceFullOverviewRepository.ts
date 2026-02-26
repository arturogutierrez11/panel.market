import { IGetMarketplaceFullOverviewRepository } from '@/src/core/adapters/repository/madre/analitics/favorites/items/overview/IGetMarketplaceFullOverviewRepository';
import { HttpClient } from '@/src/core/driver/repository/http/httpClient';
import { MarketplaceFullOverview } from '@/src/core/entitis/madre/analitics/favorites/MarketplaceFullOverview.entity';

export class GetMarketplaceFullOverviewRepository
  implements IGetMarketplaceFullOverviewRepository
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
  ): Promise<MarketplaceFullOverview> {
    return this.http.get(
      `/api/analytics/marketplace-favorites/${marketplaceId}/full-overview`
    );
  }
}