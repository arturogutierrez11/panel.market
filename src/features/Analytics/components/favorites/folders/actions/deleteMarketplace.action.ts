import { IDeleteMarketplaceRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/folders/delete/IDeleteMarketplaceRepository";

export async function deleteMarketplaceAction(
  repository: IDeleteMarketplaceRepository,
  id: number
) {
  return repository.execute(id);
}