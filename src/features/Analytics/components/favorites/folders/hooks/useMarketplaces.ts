'use client';

import { useEffect, useState } from 'react';
import { GetFoldersRepository } from '@/src/core/driver/repository/madre/analitics/favorites/folders/get/GetFoldersRepository';
import { Marketplace } from '@/src/core/entitis/madre/analitics/favorites/folder/status/marketplace.types';

export function useMarketplaces() {
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const repo = new GetFoldersRepository();
      const data = await repo.execute();
      setMarketplaces(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return {
    marketplaces,
    loading,
    reload: load,
  };
}