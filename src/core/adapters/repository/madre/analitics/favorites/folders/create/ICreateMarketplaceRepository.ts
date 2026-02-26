export interface ICreateMarketplaceRepository {
  execute(name: string): Promise<{ success: boolean }>;
}