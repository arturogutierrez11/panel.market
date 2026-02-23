import { IAddMarketplaceFavoriteRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/IAddMarketplaceFavoriteRepository";

export class AddMarketplaceFavorite {
  constructor(
    private readonly repository: IAddMarketplaceFavoriteRepository
  ) {}

  async execute(
    marketplaceId: number,
    productId: string,
    sellerSku: string
  ): Promise<void> {
    return this.repository.execute(
      marketplaceId,
      productId,
      sellerSku
    );
  }
}