'use server';

import { productsApi } from './productsApi';

/**
 * Megatone → sync_items
 */
export async function runProductSync(marketplace: string) {
  await productsApi(
    `/api/internal/product-sync/${marketplace}/run`,
    { method: 'POST' }
  );
}

/**
 * Madre → Sync_items → Megatone
 */
export async function syncPriceAndStock() {
  await productsApi(
    '/api/internal/product-sync/update',
    { method: 'POST' }
  );
}

/**
 * Madre → Megatone → Sync_items
 */
export async function syncStatuses() {
  await productsApi(
    '/api/internal/product-sync/status-sync',
    { method: 'POST' }
  );
}