import { MarketplaceFullOverview } from "@/src/core/entitis/madre/analitics/favorites/MarketplaceFullOverview.entity";

export interface IGetMarketplaceFullOverviewRepository {
  execute(marketplaceId: number): Promise<MarketplaceFullOverview>;
}