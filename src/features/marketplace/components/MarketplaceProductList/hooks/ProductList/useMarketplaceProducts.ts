'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MarketplaceProduct } from '@/src/core/entitis/marketplace/shared/products/get/MarketplaceProduct';
import { getMegatoneProductsAction } from './actions/getMegatoneProducts';
import { getOncityProductsAction } from './actions/getOncityProducts';

const PAGE_SIZE = 11;

type Params = {
  marketplaceId: string;
};

export function useMarketplaceProducts({ marketplaceId }: Params) {
  const [items, setItems] = useState<MarketplaceProduct[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const hasFetchedRef = useRef(false);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const fetchPage = useCallback(
    async (nextPage: number) => {
      if (loading) return;
      if (nextPage < 1 || (totalPages && nextPage > totalPages)) return;

      setLoading(true);

      try {
        const offset = (nextPage - 1) * PAGE_SIZE;

        let response;

        if (marketplaceId === 'megatone') {
          response = await getMegatoneProductsAction({
            offset,
            limit: PAGE_SIZE,
          });
        } else if (marketplaceId === 'oncity') {
          response = await getOncityProductsAction({
            offset,
            limit: PAGE_SIZE,
          });
        } else {
          throw new Error(`Marketplace no soportado: ${marketplaceId}`);
        }

        setItems(response.items);
        setTotal(response.total);
        setPage(nextPage);
      } finally {
        setLoading(false);
      }
    },
    [marketplaceId, loading, totalPages]
  );

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketplaceId]);

  return {
    items,
    page,
    total,
    totalPages,
    loading,
    fetchNext: () => fetchPage(page + 1),
    fetchPrev: () => fetchPage(page - 1),
    refresh: () => fetchPage(page),
  };
}