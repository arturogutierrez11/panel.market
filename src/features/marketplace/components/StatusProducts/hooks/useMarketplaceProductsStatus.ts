'use client';

import { useEffect, useState } from 'react';
import { MarketplaceProductsStatus } from '@/src/core/entitis/marketplace/shared/products/status/MarketplaceProductsStatus';

type Params = {
  marketplace: 'megatone' | 'oncity';
};

export function useMarketplaceProductsStatus({
  marketplace,
}: Params) {
  const [items, setItems] = useState<MarketplaceProductsStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchStatus() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MADRE_API_URL}/api/internal/marketplace/products/${marketplace}/status`,
          { cache: 'no-store' }
        );

        const data = await res.json();

        if (!mounted) return;

        setItems(
          data.map((item: any) => ({
            status: item.status,
            total: Number(item.total),
          }))
        );
      } catch (e) {
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchStatus();

    return () => {
      mounted = false;
    };
  }, [marketplace]);

  return {
    items,
    loading,
  };
}