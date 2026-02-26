'use client';

import { useMemo, useState } from 'react';
import { removeMarketplaceFavoriteAction } from '../actions/removeMarketplaceFavorite.action';
import { RemoveMarketplaceFavoriteRepository } from '@/src/core/driver/repository/madre/analitics/favorites/items/delete/RemoveMarketplaceFavoriteRepository';

export function useMarketplaceFavoriteActions() {
  const [loading, setLoading] = useState(false);

  const repository = useMemo(
    () => new RemoveMarketplaceFavoriteRepository(),
    []
  );

  const removeFavorite = async (
    marketplaceId: number,
    productId: string
  ) => {
    try {
      setLoading(true);
      await removeMarketplaceFavoriteAction(
        marketplaceId,
        productId
      );
    } finally {
      setLoading(false);
    }
  };

  return { removeFavorite, loading };
}