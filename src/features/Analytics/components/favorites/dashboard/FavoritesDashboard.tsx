'use client';

import { useState } from 'react';

import { useMarketplaces } from '../folders/hooks/useMarketplaces';
import { useCreateMarketplace } from '../folders/hooks/useCreateMarketplace';
import { useDeleteMarketplace } from '../folders/hooks/useDeleteMarketplace';
import { useUpdateMarketplaceStatus } from '../folders/hooks/useUpdateMarketplaceStatus';

import { useMarketplaceOverview } from '../overview/hooks/useMarketplaceOverview';

import { MarketplaceOverviewCards } from '../overview/components/MarketplaceOverviewCards';
import { MarketplaceStatusBadge } from '../folders/components/MarketplaceStatusBadge';
import { CreateMarketplaceModal } from '../folders/components/CreateMarketplaceModal';
import { ConfirmDeleteModal } from '../folders/components/ConfirmDeleteModal';
import { MarketplaceTabs } from './MarketplaceTabs';

export default function FavoritesDashboard() {
  const { marketplaces, loading, reload } = useMarketplaces();
  const { createMarketplace } = useCreateMarketplace();
  const { deleteMarketplace } = useDeleteMarketplace();
  const { updateStatus } = useUpdateMarketplaceStatus();

  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const selected = marketplaces.find(m => m.id === selectedId);

  // ✅ Ahora usamos el hook liviano
  const { data: overview, loading: loadingOverview } =
    useMarketplaceOverview(selectedId);

  const handleCreate = async (name: string) => {
    await createMarketplace(name);
    await reload();
    setShowCreate(false);
  };

  const handleDelete = async () => {
    if (!selected) return;

    if (selected.status === 'closed') {
      alert('No se puede eliminar una carpeta cerrada.');
      return;
    }

    await deleteMarketplace(selected.id);
    setSelectedId(undefined);
    setShowDelete(false);
    await reload();
  };

  const handleStatusToggle = async () => {
    if (!selected) return;

    const newStatus =
      selected.status === 'active' ? 'closed' : 'active';

    await updateStatus(selected.id, newStatus);
    await reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-400 animate-pulse">
        Cargando carpetas...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ================= TABS ================= */}

      <MarketplaceTabs
        marketplaces={marketplaces}
        selected={selectedId}
        onSelect={setSelectedId}
        onCreate={() => setShowCreate(true)}
      />

      {/* ================= CREATE MODAL ================= */}

      <CreateMarketplaceModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreate}
      />

      {!selectedId && (
        <div className="text-center text-zinc-500 py-20">
          Seleccioná una carpeta o creá una nueva.
        </div>
      )}

      {selected && (
        <div
          className={`space-y-10 transition ${
            selected.status === 'closed'
              ? 'opacity-60'
              : ''
          }`}
        >

          {/* ================= HEADER ================= */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            {/* Left */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold text-white">
                  {selected.name}
                </h2>
                <MarketplaceStatusBadge status={selected.status} />
              </div>

              <p className="text-sm text-zinc-400">
                Gestioná productos y métricas de esta carpeta.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  window.open(
                    `/admin/commerce/favorites/${selectedId}/products`,
                    '_blank'
                  )
                }
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition shadow-lg shadow-blue-900/20"
              >
                Ver productos
              </button>

              <button
                onClick={handleStatusToggle}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition text-sm"
              >
                {selected.status === 'active'
                  ? 'Cerrar carpeta'
                  : 'Reactivar'}
              </button>

              <button
                onClick={() => setShowDelete(true)}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500 transition text-sm"
              >
                Eliminar
              </button>

            </div>
          </div>

          {/* ================= OVERVIEW ================= */}

          <div className="transition-all duration-300">
            {loadingOverview ? (
              <div className="flex justify-center py-16">
                <div className="text-zinc-500 animate-pulse text-sm">
                  Cargando métricas...
                </div>
              </div>
            ) : overview ? (
              <MarketplaceOverviewCards overview={overview} />
            ) : null}
          </div>

        </div>
      )}

      {/* ================= DELETE MODAL ================= */}

      <ConfirmDeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />

    </div>
  );
}