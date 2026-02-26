'use client';

import { useEffect, useState, useMemo } from 'react';
import { getMarketplaceFavoritesAction } from '../actions/getMarketplaceFavorites.action';
import { MarketplaceFavoriteProduct } from '@/src/core/entitis/madre/analitics/favorites/MarketplaceFavoriteProduct';
import { GetMarketplaceFavoritesRepository } from '@/src/core/driver/repository/madre/analitics/favorites/items/GetMarketplaceFavoritesRepository';
import { FavoritesFilters } from '@/src/core/driver/repository/madre/analitics/favorites/items/GetMarketplaceFavoritesRepository';

export function useMarketplaceFavorites(marketplaceId?: number) {
  const repository = useMemo(
    () => new GetMarketplaceFavoritesRepository(),
    []
  );

  const [data, setData] = useState<MarketplaceFavoriteProduct[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const load = async (filters?: FavoritesFilters) => {
    if (!marketplaceId) return;

    try {
      setLoading(true);

      const result = await getMarketplaceFavoritesAction(
        repository,
        marketplaceId,
        filters
      );

      setData(result.data ?? []);
      setPagination(result.pagination ?? null);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [marketplaceId]);

  return {
    data,
    pagination,
    loading,
    reload: load,
  };
}