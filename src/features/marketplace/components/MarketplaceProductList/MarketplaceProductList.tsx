'use client';

import { useMarketplaceProducts } from './hooks/ProductList/useMarketplaceProducts';
import { MarketplaceProductCard } from './MarketplaceProductCard';
import { MarketplaceProductSkeleton } from './MarketplaceProductSkeleton';

type Props = {
  marketplaceId: string;
};

export default function MarketplaceProductList({ marketplaceId }: Props) {
  const {
    items,
    page,
    totalPages,
    loading,
    fetchNext,
    fetchPrev,
    refresh,
  } = useMarketplaceProducts({ marketplaceId });

  return (
    <div className="relative rounded-2xl bg-white p-6 shadow space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-black font-semibold">Productos</h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {loading && items.length === 0
          ? Array.from({ length: 12 }).map((_, i) => (
              <MarketplaceProductSkeleton key={i} />
            ))
          : items.map(product => (
              <MarketplaceProductCard
                key={product.publicationId}
                product={product}
              />
            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4 text-black text-sm">
        <span>
          Página <b>{page}</b> de <b>{totalPages || 1}</b>
        </span>

        <div className="flex gap-2">
          <button
            onClick={fetchPrev}
            disabled={page === 1 || loading}
            className="rounded border px-3 py-2 disabled:opacity-50"
          >
            ← Anterior
          </button>

          <button
            onClick={fetchNext}
            disabled={page === totalPages || loading}
            className="rounded border px-3 py-2 disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}