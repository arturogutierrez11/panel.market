import { IGetMarketplaceFavoritesRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/items/getDetails/IGetMarketplaceFavoritesRepository";
import { FavoritesFilters } from "@/src/core/driver/repository/madre/analitics/favorites/items/GetMarketplaceFavoritesRepository";

export async function getMarketplaceFavoritesAction(
  repository: IGetMarketplaceFavoritesRepository,
  marketplaceId: number,
  filters?: FavoritesFilters
) {
  return repository.execute(marketplaceId, filters);
}
