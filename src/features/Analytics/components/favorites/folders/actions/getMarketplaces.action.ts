import { IGetFoldersRepository } from '@/src/core/adapters/repository/madre/analitics/favorites/folders/get/IGetFoldersRepository';
import { Marketplace } from '@/src/core/entitis/madre/analitics/favorites/folder/status/marketplace.types';

export async function getMarketplacesAction(
  repository: IGetFoldersRepository
): Promise<Marketplace[]> {
  return repository.execute();
}