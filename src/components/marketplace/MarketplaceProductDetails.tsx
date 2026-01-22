'use client';

import { useEffect, useState } from 'react';
import {
  getMarketplaceProductStatus,
  ProductStatusSummary,
} from '@/src/service/marketplaceProducts.read';

type Props = {
  marketplaceId: string;
};

export default function MarketplaceProductDetails({
  marketplaceId,
}: Props) {
  const [items, setItems] = useState<ProductStatusSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchStatus() {
      try {
        setLoading(true);
        const data = await getMarketplaceProductStatus(
          marketplaceId
        );
        if (mounted) setItems(data);
      } catch {
        setError(
          'No se pudo obtener el estado de los productos'
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchStatus();

    return () => {
      mounted = false;
    };
  }, [marketplaceId]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        <p className="text-sm text-gray-500">
          Cargando estado de productos…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        <p className="text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Estado de productos en Marketplace
        </h3>
        <p className="text-sm text-gray-500">
          Resumen actual de publicaciones por estado
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map(item => (
          <StatusCard
            key={item.status}
            status={item.status}
            total={Number(item.total)}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Subcomponentes ---------- */

function StatusCard({
  status,
  total,
}: {
  status: 'ACTIVE' | 'PAUSED' | 'DELETED';
  total: number;
}) {
  const styles =
    status === 'ACTIVE'
      ? 'bg-green-50 text-green-700 border-green-200'
      : status === 'PAUSED'
      ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
      : 'bg-red-50 text-red-700 border-red-200';

  const label =
    status === 'ACTIVE'
      ? 'Activos'
      : status === 'PAUSED'
      ? 'Pausados'
      : 'Eliminados';

  return (
    <div
      className={`
        rounded-xl
        border
        p-4
        ${styles}
      `}
    >
      <div className="text-xs uppercase tracking-wide">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold">
        {total.toLocaleString()}
      </div>
    </div>
  );
}