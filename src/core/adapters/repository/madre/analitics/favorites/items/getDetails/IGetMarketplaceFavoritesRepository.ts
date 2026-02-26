import { FavoritesFilters, PaginatedFavoritesResponse } from "@/src/core/driver/repository/madre/analitics/favorites/items/GetMarketplaceFavoritesRepository";

export interface IGetMarketplaceFavoritesRepository {
  execute(
      marketplaceId: number,
      filters?: FavoritesFilters
    ): Promise<PaginatedFavoritesResponse>
}