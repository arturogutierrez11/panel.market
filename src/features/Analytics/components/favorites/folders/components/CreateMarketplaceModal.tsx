'use client';

import { useState } from 'react';

type Props = {
  open: boolean;
  onSubmit: (name: string) => void;
  onClose: () => void;
};

export function CreateMarketplaceModal({
  open,
  onSubmit,
  onClose,
}: Props) {
  const [name, setName] = useState('');

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name.trim()) return;

    await onSubmit(name.trim());
    setName('');
    onClose(); // 👈 esto es importante
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl w-[420px] shadow-2xl">

        <h3 className="text-lg font-semibold text-white mb-4">
          Crear nueva carpeta
        </h3>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la carpeta"
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-700 text-white hover:bg-zinc-600 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}