import { IGetMarketplacesRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/IGetMarketplacesRepository";

export class GetMarketplaces {
  constructor(
    private readonly repository: IGetMarketplacesRepository
  ) {}

  async execute() {
    return this.repository.execute();
  }
}