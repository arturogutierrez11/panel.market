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

  return (
    <div className="relative rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500">
          Publicaciones activas y sincronizadas
        </p>

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

      {/* ================= GRID ================= */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {(loading && items.length === 0) &&
            Array.from({ length: 10 }).map((_, i) => (
              <MarketplaceProductSkeleton key={i} />
            ))}

          {!loading &&
            items.map(product => (
              <MarketplaceProductCard
                key={product.publicationId}
                product={product}
              />
            ))}
        </div>

        {/* ================= LOADER OVERLAY ================= */}
        {(loading || paging) && (
          <div
            className="
              absolute inset-0
              rounded-xl
              bg-white/70
              backdrop-blur-sm
              flex flex-col items-center justify-center
              gap-3
              z-10
            "
          >
            <BrandSpinner />
            <span className="text-xs text-gray-500">
              Cargando productos…
            </span>
          </div>
        )}
      </div>

      {/* ================= PAGINATION ================= */}
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
    </div>
  );
}