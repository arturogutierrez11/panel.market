'use server';

import { madreApi } from './madreApi';
import { marketplaceApi } from './marketplaceApi';

/* ================================
 * Tipos
 * ================================ */

export type ProductStatusSummary = {
  status: 'ACTIVE' | 'PAUSED' | 'DELETED';
  total: string;
};

export type MarketplaceProduct = {
  publicationId: number;
  sellerSku: string;
  marketSku: string;
  title: string;
  price: number;
  stock: number;
  status: string;
  images: string[];
};

type MarketplaceProductsResponse = {
  items: MarketplaceProduct[];
  total: number;
  limit: number;
  offset: number;
  count: number;
  hasNext: boolean;
  nextOffset: number | null;
};

/* ================================
 * Estado de productos por marketplace
 * ================================ */
/**
 * Devuelve resumen por estado:
 * ACTIVE / PAUSED / DELETED
 *
 * Ej:
 * [
 *   { status: 'ACTIVE', total: '1952' },
 *   { status: 'PAUSED', total: '1500' },
 *   { status: 'DELETED', total: '571' }
 * ]
 */
export async function getMarketplaceProductStatus(
  marketplace: string
): Promise<ProductStatusSummary[]> {
  return madreApi<ProductStatusSummary[]>(
    `/api/internal/marketplace/products/${marketplace}/status`
  );
}

/* ================================
 * Productos publicados en Marketplace
 * ================================ */
/**
 * Lista productos publicados en el marketplace
 * (Megatone, etc.)
 */
export async function getMarketplaceProducts(params: {
  marketplace: string;
  offset: number;
  limit: number;
}): Promise<MarketplaceProductsResponse> {
  const { marketplace, offset, limit } = params;

  return marketplaceApi<MarketplaceProductsResponse>(
    `/${marketplace}/products?offset=${offset}&limit=${limit}`
  );
}