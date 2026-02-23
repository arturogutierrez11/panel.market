'use client';

import { useEffect, useState } from 'react';
import { GetMarketplacesRepository } from '@/src/core/driver/repository/madre/analitics/favorites/GetMarketplacesRepository';
import { GetMarketplaces } from './actions/getMarketplaces';
import { Marketplace } from '@/src/core/entitis/madre/analitics/favorites/MarketplaceFavoriteProduct';

export function useMarketplaces() {
  const [data, setData] = useState<Marketplace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const repository = new GetMarketplacesRepository();
      const action = new GetMarketplaces(repository);
      const result = await action.execute();
      setData(result);
      setLoading(false);
    }

    fetch();
  }, []);

  return { data, loading, setData };
}