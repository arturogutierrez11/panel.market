import { MarketplaceFavoriteProduct } from "@/src/core/entitis/madre/analitics/favorites/MarketplaceFavoriteProduct";

export interface IGetMarketplaceFavoritesRepository {
  execute(
    marketplaceId: number
  ): Promise<MarketplaceFavoriteProduct[]>;
}