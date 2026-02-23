export interface IRemoveMarketplaceFavoriteRepository {
  execute(
    marketplaceId: number,
    productId: string
  ): Promise<void>;
}