import { IGetMarketplaceFullOverviewRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/items/overview/IGetMarketplaceFullOverviewRepository";
import { GetMarketplaceFullOverviewRepository } from "@/src/core/driver/repository/madre/analitics/favorites/overview/GetMarketplaceFullOverviewRepository";

export async function getMarketplaceFullOverviewAction(
  marketplaceId: number,
  repository?: IGetMarketplaceFullOverviewRepository
) {
  const repo = repository ?? new GetMarketplaceFullOverviewRepository();
  return repo.execute(marketplaceId);
}