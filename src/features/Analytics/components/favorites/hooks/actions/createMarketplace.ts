import { ICreateMarketplaceRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/ICreateMarketplaceRepository";

export class CreateMarketplace {
  constructor(
    private readonly repository: ICreateMarketplaceRepository
  ) {}

  async execute(name: string) {
    return this.repository.execute(name);
  }
}