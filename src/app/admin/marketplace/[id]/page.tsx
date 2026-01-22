import Image from 'next/image';
import { MARKETPLACES } from '@/src/config/marketplace/marketplaces';
import { getLastSyncRun } from '@/src/service/productSync.read';
import MarketplaceDetailClient from './MarketplaceDetailClient';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MarketplaceDetailPage({ params }: Props) {
  const { id } = await params;

  const marketplace = MARKETPLACES.find(m => m.id === id);

  // resto igual


  if (!marketplace) {
    return <div className="text-gray-500">Marketplace no encontrado</div>;
  }

  const lastRun = await getLastSyncRun(id);

  const initialOverview = lastRun
    ? {
        status: lastRun.status,
        processed: lastRun.items_processed,
        failed: lastRun.items_failed,
        startedAt: lastRun.started_at,
        finishedAt: lastRun.finished_at ?? null,
      }
    : null;

  return (
    <MarketplaceDetailClient
      marketplace={marketplace}
      initialOverview={initialOverview}
    />
  );
}