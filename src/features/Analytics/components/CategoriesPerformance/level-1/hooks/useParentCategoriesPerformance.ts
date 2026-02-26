'use client';

import { useEffect, useState, useMemo } from 'react';
import { GetParentCategoriesPerformanceRepository } from '@/src/core/driver/repository/madre/analitics/categories-analitycs/GetCategoriesLevel-1/getParentCategoriesPerformanceRepository';

export function useParentCategoriesPerformance() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const repo = useMemo(
    () => new GetParentCategoriesPerformanceRepository(),
    []
  );

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await repo.execute();
        if (mounted) {
          setData(response ?? []);
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
  }, [repo]);

  return { data, loading };
}