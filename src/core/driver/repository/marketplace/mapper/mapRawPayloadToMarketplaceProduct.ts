import { MarketplaceProduct } from '@/src/core/entitis/marketplace/shared/products/get/MarketplaceProduct';

type RawPayload = {
  publicationId: number | string;
  sellerSku: string;
  marketSku?: string;
  title: string;
  price: number;
  stock: number;
  status: string;
  images?: string[];
  linkPublicacion?: string;
};

export function mapRawPayloadToMarketplaceProduct(
  raw: RawPayload
): MarketplaceProduct {
  return {
    publicationId: raw.publicationId,
    sellerSku: raw.sellerSku,
    marketSku: raw.marketSku,
    title: raw.title,
    price: Number(raw.price),
    stock: raw.stock,
    status: mapStatus(raw.status),
    publicationUrl: raw.linkPublicacion,
    images: raw.images ?? [],
  };
}

function mapStatus(status: string): MarketplaceProduct['status'] {
  switch (status) {
    case 'Activo':
    case 'ACTIVE':
      return 'ACTIVE';
    case 'Pausado':
    case 'PAUSED':
      return 'PAUSED';
    default:
      return 'DELETED';
  }
}