export interface IGetMarketplacesRepository {
  execute(): Promise<
    {
      id: number;
      name: string;
    }[]
  >;
}