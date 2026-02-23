'use client';

import { useState } from 'react';
import { CreateMarketplaceRepository } from '@/src/core/driver/repository/madre/analitics/favorites/CreateMarketplaceRepository';
import { CreateMarketplace } from '../hooks/actions/createMarketplace';

export function CreateMarketplaceModal({
  onClose,
  onCreated
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!name.trim()) return;

    setLoading(true);

    const repo = new CreateMarketplaceRepository();
    const action = new CreateMarketplace(repo);

    await action.execute(name);

    setLoading(false);
    onCreated();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 w-96 space-y-4">

        <h3 className="text-white font-semibold">
          Crear Marketplace
        </h3>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del marketplace"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white"
          >
            Cancelar
          </button>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-4 py-2 text-sm bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
          >
            Crear
          </button>
        </div>

      </div>
    </div>
  );
}