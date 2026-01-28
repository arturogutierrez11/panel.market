'use client';

import { BrandSpinner } from '@/src/components/loader/BrandSpinner';
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
    paging,
    fetchNext,
    fetchPrev,
    refresh,
  } = useMarketplaceProducts({ marketplaceId });

  if (loading && items.length === 0) {
  return (
    <div className="rounded-2xl bg-white p-12 shadow flex justify-center">
      <BrandSpinner />
    </div>
  );
}

  return (
    <div className="relative rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Productos
          </h3>
          <p className="text-xs text-gray-500">
            Publicaciones activas y sincronizadas
          </p>
        </div>

        <button
          onClick={refresh}
          disabled={loading}
          className="
            inline-flex items-center gap-2
            rounded-full
            border border-gray-200
            px-4 py-2
            text-xs font-medium text-gray-700
            hover:bg-gray-50
            disabled:opacity-40
            transition
          "
        >
          ⟳ Actualizar
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <MarketplaceProductSkeleton key={i} />
          ))
        ) : (
          items.map(product => (
            <MarketplaceProductCard
              key={product.publicationId}
              product={product}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <span className="text-xs text-gray-500">
          Página <b className="text-gray-900">{page}</b> de{' '}
          <b className="text-gray-900">{totalPages || 1}</b>
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchPrev}
            disabled={page === 1 || paging}
            className="
              rounded-full
              border border-gray-200
              px-4 py-2
              text-xs font-medium text-gray-700
              hover:bg-gray-50
              disabled:opacity-30
              transition
            "
          >
            ← Anterior
          </button>

          <button
            onClick={fetchNext}
            disabled={page === totalPages || paging}
            className="
              rounded-full
              border border-gray-200
              px-4 py-2
              text-xs font-medium text-gray-700
              hover:bg-gray-50
              disabled:opacity-30
              transition
            "
          >
            Siguiente →
          </button>
        </div>
      </div>

      {/* Overlay futurista SOLO paginado */}
     {paging && (
  <div
    className="
      absolute inset-0
      rounded-2xl
      bg-white/70
      backdrop-blur-sm
      flex items-center justify-center
      z-10
    "
  >
    <BrandSpinner />
  </div>
)}
    </div>
  );
}