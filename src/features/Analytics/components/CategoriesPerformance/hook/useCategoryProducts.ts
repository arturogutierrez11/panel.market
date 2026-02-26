'use client';

import { useCallback, useEffect, useState } from 'react';
import { GetCategoryProducts } from './actions/GetCategoryProducts';
import { CategoryProduct, CategoryProductsFilters, CategoryProductsMeta, GetCategoryProductsRepository } from '@/src/core/driver/repository/madre/analitics/categories-analitycs/categoriesProducts/GetCategoryProductsRepository';


export function useCategoryProducts(
  categoryId: string,
  page: number = 1,
  limit: number = 20,
  filters?: CategoryProductsFilters
) {
  const [items, setItems] = useState<CategoryProduct[]>([]);
  const [meta, setMeta] = useState<CategoryProductsMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = new GetCategoryProductsRepository();
  const action = new GetCategoryProducts(repository);

  const fetchData = useCallback(async () => {
    if (!categoryId) return;

    try {
      setLoading(true);
      setError(null);

      const result = await action.execute(
        categoryId,
        page,
        limit,
        filters
      );

      setItems(result.items ?? []);
      setMeta(result.meta ?? null);

    } catch (err) {
      setError('No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  }, [categoryId, page, limit, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    items,
    meta,
    loading,
    error,
    refetch: fetchData,
  };
}