'use client';

import { useEffect, useState, useCallback } from 'react';
import { getMarketplaceFullOverviewAction } from '../actions/getMarketplaceFullOverview.action';
import { MarketplaceFullOverview } from '@/src/core/entitis/madre/analitics/favorites/MarketplaceFullOverview.entity';

export function useMarketplaceFullOverview(marketplaceId?: number) {
  const [data, setData] = useState<MarketplaceFullOverview | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!marketplaceId) return;

    try {
      setLoading(true);

      const result = await getMarketplaceFullOverviewAction(
        marketplaceId
      );

      setData(result ?? null);

    } finally {
      setLoading(false);
    }
  }, [marketplaceId]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    loading,
    reload: load,
  };
}