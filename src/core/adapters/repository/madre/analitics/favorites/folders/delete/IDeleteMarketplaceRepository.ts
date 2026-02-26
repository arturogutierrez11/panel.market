export interface IDeleteMarketplaceRepository {
  execute(id: number): Promise<{ success: boolean }>;
}