export interface IAddMarketplaceFavoriteRepository {
  execute(
    marketplaceId: number,
    productId: string,
    sellerSku: string
  ): Promise<void>;
}