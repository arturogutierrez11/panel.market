import { IRemoveMarketplaceFavoriteRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/IRemoveMarketplaceFavoriteRepository";

export class RemoveMarketplaceFavorite {
  constructor(
    private readonly repository: IRemoveMarketplaceFavoriteRepository
  ) {}

  async execute(
    marketplaceId: number,
    productId: string
  ) {
    return this.repository.execute(
      marketplaceId,
      productId
    );
  }
}