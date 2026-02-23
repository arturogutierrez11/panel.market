export interface IAddMarketplaceFavoritesBulkRepository {
  execute(params: {
    marketplaceIds: number[];
    products: {
      productId: string;
      sellerSku: string;
    }[];
  }): Promise<void>;
}