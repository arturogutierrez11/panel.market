'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import MarketplaceOverview from '@/src/components/marketplace/MarketplaceOverview';
import RefreshOverviewButton from '@/src/components/marketplace/RefreshOverviewButton';
import RunSyncButton from '@/src/components/marketplace/SyncActions';
import MarketplaceActions from '@/src/components/marketplace/MarketplaceActions';
import MarketplaceProductStatus from '@/src/components/marketplace/MarketplaceProductStatus';

type SyncOverview = {
  status: 'SUCCESS' | 'ERROR' | 'RUNNING';
  processed: number;
  failed: number;
  startedAt: string;
  finishedAt?: string | null;
};

type Props = {
  marketplace: {
    id: string;
    name: string;
    logo: string;
  };
  initialOverview: SyncOverview | null;
};

export default function MarketplaceDetailClient({
  marketplace,
  initialOverview,
}: Props) {
  const router = useRouter();
  const overview = initialOverview;
  const [refreshing, setRefreshing] = useState(false);

  function refreshOverview() {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 500);
  }

  // 🔁 Auto-refresh si está RUNNING
  useEffect(() => {
    if (!overview) return;
    if (overview.status !== 'RUNNING') return;

    const interval = setInterval(() => {
      router.refresh();
    }, 10000);

    return () => clearInterval(interval);
  }, [overview?.status, router]);

  return (
    <div className="space-y-8">
      {/* Header visual */}
      <div className="flex items-center gap-6">
        <div className="rounded-2xl bg-white p-6 shadow">
          <Image
            src={marketplace.logo}
            alt={marketplace.name}
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
      </div>

      {overview && (
        <>
          {/* OVERVIEW */}
          <MarketplaceOverview
            overview={overview}
            actions={
              <>
                <RefreshOverviewButton
                  loading={refreshing}
                  onRefresh={refreshOverview}
                />
                <RunSyncButton
                  marketplaceId={marketplace.id}
                  disabled={overview.status === 'RUNNING'}
                />
              </>
            }
          />

          {/* ACCIONES MANUALES */}
          <MarketplaceActions
            marketplaceId={marketplace.id}
            isRunning={overview.status === 'RUNNING'}
          />

          {/* ESTADO DE PRODUCTOS */}
          <MarketplaceProductStatus
            marketplaceId={marketplace.id}
          />
        </>
      )}
    </div>
  );
}