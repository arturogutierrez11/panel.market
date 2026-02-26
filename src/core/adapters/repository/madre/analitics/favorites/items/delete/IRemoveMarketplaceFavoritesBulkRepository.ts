export interface IRemoveMarketplaceFavoritesBulkRepository {
  execute(
    marketplaceId: number,
    productIds: string[]
  ): Promise<void>;
}