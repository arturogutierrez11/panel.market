'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  getMarketplaceProducts,
  MarketplaceProduct,
} from '@/src/service/marketplaceProducts.read';

type Props = {
  marketplaceId: string;
};

const PAGE_SIZE = 12;

export default function MarketplaceProductList({
  marketplaceId,
}: Props) {
  const [items, setItems] = useState<MarketplaceProduct[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  async function fetchPage(nextPage: number) {
    if (loading) return;
    if (nextPage < 1 || (totalPages && nextPage > totalPages)) return;

    setLoading(true);

    try {
      const res = await getMarketplaceProducts({
        marketplace: marketplaceId,
        offset: (nextPage - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
      });

      setItems(res.items);
      setTotal(res.total);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  }

  function refresh() {
    fetchPage(page);
  }

  useEffect(() => {
    fetchPage(1);
  }, [marketplaceId]);

  return (
    <div className="relative rounded-2xl bg-white p-6 shadow space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Productos en Marketplace
          </h3>
          <p className="text-sm text-gray-500">
            {total.toLocaleString()} publicaciones
          </p>
        </div>

        {/* Refresh */}
        <button
          onClick={refresh}
          disabled={loading}
          className="
            inline-flex items-center gap-2
            rounded-lg
            border
            px-4 py-2
            text-sm
            text-black
            bg-white
            hover:bg-gray-50
            disabled:opacity-40
          "
        >
          <span
            className={`text-black ${loading ? 'animate-spin' : ''}`}
          >
            ⟳
          </span>
          Refrescar
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && items.length === 0
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : items.map(product => (
              <ProductCard
                key={product.publicationId}
                product={product}
              />
            ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-gray-500">
          Página{' '}
          <span className="font-medium text-gray-900">
            {page}
          </span>{' '}
          de{' '}
          <span className="font-medium text-gray-900">
            {totalPages || 1}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => fetchPage(page - 1)}
            disabled={page === 1 || loading}
            className="
              rounded-lg
              border
              px-4 py-2
              text-sm
              text-black
              bg-white
              hover:bg-gray-50
              disabled:opacity-40
            "
          >
            ← Anterior
          </button>

          <button
            onClick={() => fetchPage(page + 1)}
            disabled={page === totalPages || loading}
            className="
              rounded-lg
              border
              px-4 py-2
              text-sm
              text-black
              bg-white
              hover:bg-gray-50
              disabled:opacity-40
            "
          >
            Siguiente →
          </button>
        </div>
      </div>

      {/* Loader overlay */}
      {loading && items.length > 0 && (
        <div className="absolute inset-0 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-black">
            <span className="animate-spin text-black">⟳</span>
            Actualizando productos…
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Card ---------- */

function ProductCard({ product }: { product: MarketplaceProduct }) {
  const image = product.images?.[0];

  const statusStyle =
    product.status === 'Activo'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';

  return (
    <div className="rounded-xl border bg-white p-4 space-y-3 transition hover:shadow-md">
      {/* Imagen */}
      <div className="relative h-36 w-full rounded-lg bg-gray-50 overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 33vw"
            className="object-contain p-3"
          />
        )}
      </div>

      <div className="space-y-1">
        <div className="text-xs text-gray-400">
          SKU {product.sellerSku}
        </div>

        <div className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.title}
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">
            Stock {product.stock}
          </span>
        </div>

        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusStyle}`}
        >
          {product.status}
        </span>
      </div>
    </div>
  );
}

/* ---------- Skeleton ---------- */

function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-white p-4 space-y-3 animate-pulse">
      <div className="h-36 w-full rounded-lg bg-gray-200" />
      <div className="h-3 w-24 bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-2/3 bg-gray-200 rounded" />
      <div className="flex justify-between">
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}