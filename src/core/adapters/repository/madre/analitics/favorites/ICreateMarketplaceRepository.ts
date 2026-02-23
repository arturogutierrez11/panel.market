export interface ICreateMarketplaceRepository {
  execute(name: string): Promise<void>;
}