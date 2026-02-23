import { IAddMarketplaceFavoritesBulkRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/IAddMarketplaceFavoritesBulkRepository";

export class AddMarketplaceFavoritesBulk {
  constructor(
    private readonly repository: IAddMarketplaceFavoritesBulkRepository
  ) {}

  async execute(params: {
    marketplaceIds: number[];
    products: {
      productId: string;
      sellerSku: string;
    }[];
  }) {
    return this.repository.execute(params);
  }
}