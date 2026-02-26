'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FavoritesProductsContainer } from
'@/src/features/Analytics/components/favorites/items/components/FavoritesProductsContainer';
import { BrandSpinner } from '@/src/components/loader/BrandSpinner';

export default function FavoritesProductsPage() {
  const params = useParams();
  const marketplaceId = Number(params.id);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (marketplaceId) {
      setReady(true);
    }
  }, [marketplaceId]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <BrandSpinner size={60} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Productos de la carpeta #{marketplaceId}
      </h1>

      <FavoritesProductsContainer
        marketplaceId={marketplaceId}
      />
    </div>
  );
}