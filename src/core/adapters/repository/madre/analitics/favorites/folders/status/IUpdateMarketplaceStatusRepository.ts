export interface IUpdateMarketplaceStatusRepository {
  execute(
    id: number,
    status: 'active' | 'closed'
  ): Promise<any>;
}