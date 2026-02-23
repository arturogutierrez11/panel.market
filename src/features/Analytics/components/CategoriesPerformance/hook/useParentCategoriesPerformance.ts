'use client';

import { useEffect, useState } from 'react';
import { getParentCategoriesPerformanceAction } from './actions/getParentCategoriesPerformance';

export function useParentCategoriesPerformance() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await getParentCategoriesPerformanceAction();
        if (mounted) {
          setData(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading };
}