'use client';

import { useEffect, useState } from 'react';
import { useMarketplaceProductsStatus } from './hooks/useMarketplaceProductsStatus';

type Props = {
  marketplace: 'megatone' | 'oncity';
};

const STATUS_ORDER = ['ACTIVE', 'PAUSED', 'DELETED'] as const;

const STATUS_META = {
  ACTIVE: {
    label: 'Activos',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  PAUSED: {
    label: 'Pausados',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  DELETED: {
    label: 'Eliminados',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
} as const;

export function MarketplaceProductsStatusSummary({
  marketplace,
}: Props) {
  const { items, loading } =
    useMarketplaceProductsStatus({ marketplace });

  const [showFallbackLoader, setShowFallbackLoader] =
    useState(false);

  /* =========================
   * Loader de seguridad
   * ========================= */
  useEffect(() => {
    if (!loading) {
      setShowFallbackLoader(false);
      return;
    }

    const t = setTimeout(() => {
      setShowFallbackLoader(true);
    }, 3000);

    return () => clearTimeout(t);
  }, [loading]);

  /* =========================
   * Normalizar estados faltantes
   * ========================= */
  const normalized = STATUS_ORDER.map(status => {
    const found = items.find(i => i.status === status);
    return {
      status,
      total: found ? found.total : 0,
    };
  });

  /* =========================
   * Skeleton inmediato
   * ========================= */
  if (loading && !showFallbackLoader) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="
              h-[96px]
              rounded-2xl
              border
              bg-gray-100
              animate-pulse
            "
          />
        ))}
      </div>
    );
  }

  /* =========================
   * Loader persistente
   * ========================= */
  if (loading && showFallbackLoader) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {normalized.map(({ status }) => {
          const meta = STATUS_META[status];
          return (
            <div
              key={status}
              className={`
                flex flex-col justify-center
                rounded-2xl
                border
                px-6 py-4
                ${meta.bg}
                ${meta.border}
                opacity-60
              `}
            >
              <span
                className={`
                  text-sm font-medium
                  ${meta.text}
                `}
              >
                {meta.label}
              </span>

              <span className="mt-1 text-sm text-gray-400">
                Cargando…
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  /* =========================
   * Data real
   * ========================= */
  return (
    <div className="grid grid-cols-3 gap-4">
      {normalized.map(({ status, total }) => {
        const meta = STATUS_META[status];

        return (
          <div
            key={status}
            className={`
              flex flex-col justify-center
              rounded-2xl
              border
              px-6 py-4
              ${meta.bg}
              ${meta.border}
              transition
              hover:shadow-md
            `}
          >
            <span
              className={`
                text-sm font-medium
                ${meta.text}
                opacity-80
              `}
            >
              {meta.label}
            </span>

            <span
              className={`
                mt-1
                text-3xl font-semibold
                ${meta.text}
              `}
            >
              {total.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}