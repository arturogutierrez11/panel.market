import { IUpdateMarketplaceStatusRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/folders/status/IUpdateMarketplaceStatusRepository";

export async function updateMarketplaceStatusAction(
  repository: IUpdateMarketplaceStatusRepository,
  id: number,
  status: 'active' | 'closed'
) {
  return repository.execute(id, status);
}