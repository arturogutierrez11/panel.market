import { ICreateMarketplaceRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/folders/create/ICreateMarketplaceRepository";

export async function createMarketplaceAction(
  repository: ICreateMarketplaceRepository,
  name: string
) {
  return repository.execute(name);
}