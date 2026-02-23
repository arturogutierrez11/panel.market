import { IGetMarketplaceFavoritesRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/IGetMarketplaceFavoritesRepository";

export class GetMarketplaceFavorites {
  constructor(
    private readonly repository: IGetMarketplaceFavoritesRepository
  ) {}

  async execute(marketplaceId: number) {
    return this.repository.execute(marketplaceId);
  }
}