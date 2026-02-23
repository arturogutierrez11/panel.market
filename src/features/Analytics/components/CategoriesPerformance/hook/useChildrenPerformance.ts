'use client';

import { CategoryHierarchyResponse, GetChildrenCategoriesPerformanceRepository } from '@/src/core/driver/repository/madre/analitics/GetChildrenCategoriesPerformanceRepository';
import { useEffect, useState } from 'react';


export function useChildrenPerformance(parentId?: string | null) {
  const [data, setData] = useState<CategoryHierarchyResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const repo = new GetChildrenCategoriesPerformanceRepository();

    async function fetchData() {
      setLoading(true);
      try {
        const response = await repo.execute(parentId);
        setData(response);
      } catch (err) {
        console.error('[useChildrenPerformance]', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [parentId]);

  return {
    summary: data?.summary,
    items: data?.items ?? [],
    loading,
  };
}