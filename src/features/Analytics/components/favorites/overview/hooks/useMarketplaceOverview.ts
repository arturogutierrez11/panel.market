'use client';

import { useEffect, useState } from 'react';
import { getMarketplaceOverviewAction } from '../actions/getMarketplaceOverview.action';
import { MarketplaceOverview } from '@/src/core/entitis/madre/analitics/favorites/folder/overview/MarketplaceOverview';

export function useMarketplaceOverview(marketplaceId?: number) {
  const [data, setData] = useState<MarketplaceOverview | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!marketplaceId) return;

    try {
      setLoading(true);
      const result = await getMarketplaceOverviewAction(marketplaceId);
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [marketplaceId]);

  return {
    data,
    loading,
    reload: load,
  };
}