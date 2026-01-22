'use client';

import { getMarketplaceProductStatus } from '@/src/service/marketplaceProducts.read';
import { useEffect, useState } from 'react';

type ProductStatus = {
  status: string;
  total: string;
};

export default function MarketplaceProductStatus({
  marketplaceId,
}: {
  marketplaceId: string;
}) {
  const [data, setData] = useState<ProductStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getMarketplaceProductStatus(marketplaceId);
        setData(res);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [marketplaceId]);

  if (loading) {
    return <div className="text-sm text-gray-400">Cargando estados…</div>;
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">
        Estado de productos
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div
            key={item.status}
            className="rounded-xl bg-gray-50 px-4 py-3"
          >
            <div className="text-xs uppercase text-gray-400">
              {item.status}
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {item.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}