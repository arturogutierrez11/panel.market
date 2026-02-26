import { RemoveMarketplaceFavoriteRepository } from "@/src/core/driver/repository/madre/analitics/favorites/items/delete/RemoveMarketplaceFavoriteRepository";

export async function removeMarketplaceFavoriteAction(
  marketplaceId: number,
  productId: string
) {
  const repo = new RemoveMarketplaceFavoriteRepository();
  return repo.execute(marketplaceId, productId);
}