export type MarketplaceProduct = {
  /** ID de la publicación en el marketplace */
  publicationId: number | string;

  /** SKU del seller (tu SKU interno) */
  sellerSku: string;

  /** SKU del marketplace */
  marketSku?: string;

  /** Título público */
  title: string;

  /** Precio final */
  price: number;

  /** Stock disponible */
  stock: number;

  /** Estado normalizado */
  status: MarketplaceProductStatus;

  /** URL pública del producto */
  publicationUrl?: string;

  /** Imágenes públicas */
  images: string[];
};

export type MarketplaceProductStatus =
  | 'ACTIVE'
  | 'PAUSED'
  | 'DELETED';