'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import RefreshOverviewButton from '@/src/components/marketplace/RefreshOverviewButton';
import RunSyncButton from '@/src/components/marketplace/SyncActions';
import ActionButton from '@/src/components/marketplace/ActionButton';

// 🔥 IMPORT CORRECTO
import { syncPriceAndStock, syncStatuses } 
from '@/src/service/productSync.actions';

type Props = {
  marketplaceId: string;
  isRunning: boolean;
};

export default function MarketplaceActions({
  marketplaceId,
  isRunning,
}: Props) {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  function refreshOverview() {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 500);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Acciones manuales
        </h3>
        <p className="text-sm text-gray-500">
          Ejecutá manualmente procesos de sincronización y actualización.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <RefreshOverviewButton
          loading={refreshing}
          onRefresh={refreshOverview}
        />

        <RunSyncButton
          marketplaceId={marketplaceId}
          disabled={isRunning}
        />

        <ActionButton
          label="Forzar actualización de precio y stock"
          action={syncPriceAndStock}
          warning
          disabled={isRunning}
        />

        <ActionButton
          label="Sincronizar estados de productos"
          action={syncStatuses}
          warning
          disabled={isRunning}
        />
      </div>

      {isRunning && (
        <p className="text-xs text-gray-500">
          Las acciones manuales están deshabilitadas mientras
          hay una sincronización en curso.
        </p>
      )}
    </div>
  );
}