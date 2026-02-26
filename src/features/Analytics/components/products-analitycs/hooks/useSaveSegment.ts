'use client';

import { useState } from 'react';
import { ProductsFilters } from '@/src/core/entitis/madre/analitics/products-analitycs/ProductsFilters';
import { ISaveSegmentRepository } from '@/src/core/adapters/repository/madre/analitics/products-analitycs/segments/ISaveSegmentRepository';

export function useSaveSegment(
  repository: ISaveSegmentRepository
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