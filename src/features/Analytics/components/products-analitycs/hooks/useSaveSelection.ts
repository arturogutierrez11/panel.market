'use client';

import { useState } from 'react';
import { ProductsFilters } from '@/src/core/entitis/madre/analitics/products-analitycs/ProductsFilters';
import { ISaveSelectionRepository } from '@/src/core/adapters/repository/madre/analitics/products-analitycs/saveproducts/ISaveSelectionRepository';

export function useSaveSelection(
  repository: ISaveSelectionRepository
) {
  const [loading, setLoading] = useState(false);

  const execute = async (
    marketplaceId: number,
    filters: ProductsFilters
  ) => {
    try {
      setLoading(true);
      return await repository.execute(marketplaceId, filters);
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    loading,
  };
}