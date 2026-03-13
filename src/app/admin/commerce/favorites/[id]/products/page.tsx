'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FavoritesProductsContainer } from
'@/src/features/Analytics/components/favorites/items/components/FavoritesProductsContainer';
import { BrandSpinner } from '@/src/components/loader/BrandSpinner';

export default function FavoritesProductsPage() {

  const params = useParams();
  const marketplaceId = Number(params?.id);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!marketplaceId) return;

    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);

  }, [marketplaceId]);

  if (!marketplaceId || loading) {
    return (
      <div className="max-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-400">

        <BrandSpinner size={60} />

        <span className="text-sm animate-pulse">
          Cargando productos...
        </span>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto p-8 space-y-8">

        <div>

          <h1 className="text-2xl font-semibold">
            Productos de la carpeta #{marketplaceId}
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            Gestioná y analizá los productos guardados
          </p>

        </div>

        <FavoritesProductsContainer
          marketplaceId={marketplaceId}
        />

      </div>

    </div>

  );
}