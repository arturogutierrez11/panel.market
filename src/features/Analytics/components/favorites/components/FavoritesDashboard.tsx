'use client';

import { useEffect, useState } from 'react';
import { useMarketplaces } from '../hooks/useMarketplaces';
import { MarketplaceTabs } from './MarketplaceTabs';
import { FavoritesTable } from './FavoritesTable';
import { CreateMarketplaceModal } from './CreateMarketplaceModal';
import { useMarketplaceFavorites } from '../hooks/useMarketplaceFavorites';
import { useMarketplaceFavoriteActions } from '../hooks/useMarketplaceFavoriteActions';

export default function FavoritesDashboard() {
  const { data: marketplaces, loading } = useMarketplaces();

  const [selected, setSelected] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 🔥 Auto seleccionar el primer marketplace cuando cargan
  useEffect(() => {
    if (marketplaces.length > 0 && selected === null) {
      setSelected(marketplaces[0].id);
    }
  }, [marketplaces, selected]);

  const {
    data: products,
    setData
  } = useMarketplaceFavorites(selected ?? 0);

  const { remove } = useMarketplaceFavoriteActions();

  async function handleRemove(product: any) {
    if (!selected) return;

    // Optimistic update
    setData(prev => prev.filter(p => p.id !== product.id));

    await remove(selected, product.id);
  }

  if (loading) {
    return (
      <div className="p-16 text-center text-zinc-500">
        Cargando marketplaces...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-white">
        Marketplace Favorites
      </h2>

      <MarketplaceTabs
        marketplaces={marketplaces}
        selected={selected ?? undefined}
        onSelect={setSelected}
        onCreate={() => setShowModal(true)}
      />

      {selected !== null && (
        <FavoritesTable
          products={products}
          onRemove={handleRemove}
        />
      )}

      {showModal && (
        <CreateMarketplaceModal
          onClose={() => setShowModal(false)}
          onCreated={() => window.location.reload()}
        />
      )}

    </div>
  );
}


