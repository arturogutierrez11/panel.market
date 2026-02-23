'use client';

import { AddMarketplaceFavorite } from './actions/AddMarketplaceFavorite';
import { RemoveMarketplaceFavorite } from './actions/removeMarketplaceFavorite';

import { AddMarketplaceFavoriteRepository } from '@/src/core/driver/repository/madre/analitics/favorites/AddMarketplaceFavoriteRepository';
import { AddMarketplaceFavoritesBulkRepository } from '@/src/core/driver/repository/madre/analitics/favorites/AddMarketplaceFavoritesBulkRepository';
import { RemoveMarketplaceFavoriteRepository } from '@/src/core/driver/repository/madre/analitics/favorites/RemoveMarketplaceFavoriteRepository';
import { AddMarketplaceFavoritesBulk } from './actions/AddMarketplaceFavoriteBulk';

export function useMarketplaceFavoriteActions() {

  async function add(
    marketplaceId: number,
    productId: string,
    sellerSku: string
  ) {
    const repository = new AddMarketplaceFavoriteRepository();
    const action = new AddMarketplaceFavorite(repository);

    return action.execute(marketplaceId, productId, sellerSku);
  }

  async function bulkAdd(
    marketplaceIds: number[],
    products: { productId: string; sellerSku: string }[]
  ) {
    const repository = new AddMarketplaceFavoritesBulkRepository();
    const action = new AddMarketplaceFavoritesBulk(repository);

    return action.execute({
      marketplaceIds,
      products,
    });
  }

  async function remove(
    marketplaceId: number,
    productId: string
  ) {
    const repository = new RemoveMarketplaceFavoriteRepository();
    const action = new RemoveMarketplaceFavorite(repository);

    return action.execute(marketplaceId, productId);
  }

  return {
    add,
    bulkAdd,
    remove,
  };
}