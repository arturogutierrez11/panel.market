// useMarketplaceBulkAdd.ts
'use client';

import { AddMarketplaceFavoritesBulkRepository } from '@/src/core/driver/repository/madre/analitics/favorites/items/AddMarketplaceFavoritesBulkRepository';
import { useMemo, useState } from 'react';

export function useMarketplaceBulkAdd() {
  const [loading, setLoading] = useState(false);

  const repository = useMemo(
    () => new AddMarketplaceFavoritesBulkRepository(),
    []
  );

  const bulkAdd = async (
    marketplaceIds: number[],
    products: {
      productId: string;
      sellerSku: string;
    }[]
  ) => {
    try {
      setLoading(true);
      await repository.execute({
        marketplaceIds,
        products,
      });
    
    } finally {
      setLoading(false);
    }
  };

  return { bulkAdd, loading };
}