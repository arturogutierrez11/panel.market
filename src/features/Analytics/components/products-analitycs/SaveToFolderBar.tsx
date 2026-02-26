'use client';

import { useState } from 'react';
import { ProductsFilters } from '@/src/core/entitis/madre/analitics/products-analitycs/ProductsFilters';
import { Marketplace } from '@/src/core/entitis/madre/analitics/favorites/folder/status/marketplace.types';

type Props = {
  folders: Marketplace[];
  filters: ProductsFilters;

  onSaveFlow: (
    marketplaceId: number,
    filters: ProductsFilters
  ) => Promise<any>;

  onCreateFolder: (name: string) => Promise<any>;

  loading: boolean;
};

export function SaveToFolderBar({
  folders,
  filters,
  onSaveFlow,
  onCreateFolder,
  loading,
}: Props) {

  const [selectedFolderId, setSelectedFolderId] = useState<number>();
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreateFolder = async () => {
    if (!newFolderName) return;

    await onCreateFolder(newFolderName);
    setNewFolderName('');
  };

  const handleSave = async () => {
    if (!selectedFolderId) {
      alert('Seleccioná una carpeta');
      return;
    }

    await onSaveFlow(selectedFolderId, filters);

    alert('Selección y segmento guardados');
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4 shadow-md">

      <div className="flex gap-4">

        <select
          value={selectedFolderId ?? ''}
          onChange={(e) =>
            setSelectedFolderId(
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          className="flex-1 h-10 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
        >
          <option value="">Seleccionar carpeta</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-green-600 rounded-lg text-white hover:bg-green-500"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="Nueva carpeta..."
          className="flex-1 h-10 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
        />

        <button
          onClick={handleCreateFolder}
          className="px-6 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500"
        >
          Crear
        </button>
      </div>
    </div>
  );
}