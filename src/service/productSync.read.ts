'use server';

import { madreApi } from './madreApi';

export type SyncRun = {
  status: 'SUCCESS' | 'ERROR' | 'RUNNING';
  items_processed: number;
  items_failed: number;
  started_at: string;
  finished_at?: string | null;
};

type SyncRunsResponse = {
  items: SyncRun[];
  limit: number;
  offset: number;
};

export async function getLastSyncRun(
  marketplace: string
): Promise<SyncRun | null> {
  const data = await madreApi<SyncRunsResponse>(
    `/api/internal/product-sync/runs?marketplace=${marketplace}&limit=1`
  );

  return data.items?.[0] ?? null;
}