'use client';

import { useEffect, useState, useCallback } from 'react';
import { MarketplaceFavoriteProduct } from "@/src/core/entitis/madre/analitics/favorites/MarketplaceFavoriteProduct";
import { GetMarketplaceFavoritesRepository } from "@/src/core/driver/repository/madre/analitics/favorites/GetMarketplaceFavoritesRepository";
import { GetMarketplaceFavorites } from "./actions/getMarketplaceFavorites";

export function useMarketplaceFavorites(
  marketplaceId: number | null
) {
  const [data, setData] = useState<MarketplaceFavoriteProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!marketplaceId) return;

    try {
      setLoading(true);
      setError(null);

      const repository =
        new GetMarketplaceFavoritesRepository();
      const action =
        new GetMarketplaceFavorites(repository);

      const result = await action.execute(marketplaceId);

      setData(result);

    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los favoritos');
    } finally {
      setLoading(false);
    }
  }, [marketplaceId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    setData,
    loading,
    error,
    refetch: fetchData,
  };
}