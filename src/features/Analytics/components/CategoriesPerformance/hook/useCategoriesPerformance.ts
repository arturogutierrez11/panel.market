'use client';

import { CategoryPerformance } from '@/src/core/entitis/madre/analitics/CategoryPerformance';
import { useEffect, useState } from 'react';
import { getCategoriesPerformanceAction } from './actions/getCategoriesPerformance';

type Params = {
  categoryId?: string;
  orderBy?: 'visits' | 'orders' | 'conversion' | 'revenue';
  direction?: 'asc' | 'desc';
};

export function useCategoriesPerformance(params: Params) {
  const [data, setData] = useState<CategoryPerformance[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await getCategoriesPerformanceAction(params);
        if (mounted) {
          setData(response);
        }
      } catch (error) {
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [params.categoryId, params.orderBy, params.direction]);

  return {
    data,
    loading,
  };
}