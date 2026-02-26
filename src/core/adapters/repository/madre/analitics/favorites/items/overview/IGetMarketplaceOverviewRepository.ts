import { MarketplaceOverview } from "@/src/core/entitis/madre/analitics/favorites/MarketplaceOverview.entity";

export interface IGetMarketplaceOverviewRepository {
  execute(marketplaceId: number): Promise<MarketplaceOverview>;
}