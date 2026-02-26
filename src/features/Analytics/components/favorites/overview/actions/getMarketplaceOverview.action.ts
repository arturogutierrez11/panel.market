import { IGetMarketplaceOverviewRepository } from 
'@/src/core/adapters/repository/madre/analitics/favorites/items/overview/IGetMarketplaceOverviewRepository';
import { GetMarketplaceOverviewRepository } from "@/src/core/driver/repository/madre/analitics/favorites/overview/GetMarketplaceOverviewRepository";

export async function getMarketplaceOverviewAction(
  marketplaceId: number,
  repository?: IGetMarketplaceOverviewRepository
) {
  const repo = repository ?? new GetMarketplaceOverviewRepository();
  return repo.execute(marketplaceId);
}