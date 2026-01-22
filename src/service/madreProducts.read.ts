import { madreApi } from './madreApi';

export type MadreProduct = {
  id: number;
  sku: string;
  title: string;
  price: number;
  stock: number;
  status: string;
  images: { url: string }[];
};

type Response = {
  items: MadreProduct[];
  total: number;
  limit: number;
  offset: number;
  hasNext: boolean;
  nextOffset: number | null;
};

export async function getMadreProducts(params: {
  offset: number;
  limit: number;
  sku?: string;
}): Promise<Response> {
  const query = new URLSearchParams({
    offset: String(params.offset),
    limit: String(params.limit),
  });

  if (params.sku) {
    query.append('sku', params.sku);
  }

  return madreApi<Response>(
    `/api/products/madre?${query.toString()}`
  );
}