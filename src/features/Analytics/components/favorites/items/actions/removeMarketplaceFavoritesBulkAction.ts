import { IRemoveMarketplaceFavoritesBulkRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/items/delete/IRemoveMarketplaceFavoritesBulkRepository";

export async function removeMarketplaceFavoritesBulkAction(
  repository: IRemoveMarketplaceFavoritesBulkRepository,
  marketplaceId: number,
  productIds: string[]
) {
  return repository.execute(marketplaceId, productIds);
}