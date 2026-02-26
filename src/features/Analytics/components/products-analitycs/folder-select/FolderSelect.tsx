'use client';

import { Marketplace } from '@/src/core/entitis/madre/analitics/favorites/folder/status/marketplace.types';
import { useState, useRef, useEffect } from 'react';

type Props = {
  folders: Marketplace[];
  loading: boolean;
  value?: number;
  onSelect: (folderId?: number) => void;
};

export function FolderSelect({
  folders,
  loading,
  value,
  onSelect,
}: Props) {

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedFolder = folders.find(f => f.id === value);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleClear = () => {
    onSelect(undefined);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <label className="text-sm text-zinc-400">Carpeta</label>

      <div
        className="relative mt-2"
        onClick={() => setOpen(!open)}
      >
        <div className="w-full p-2 pr-8 bg-zinc-800 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
          {selectedFolder ? (
            <span className="text-white">
              {selectedFolder.name}
            </span>
          ) : (
            <span className="text-zinc-500">
              Seleccionar carpeta...
            </span>
          )}
        </div>

        {/* BOTÓN LIMPIAR */}
        {selectedFolder && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="absolute right-2 top-[8px] text-zinc-400 hover:text-white transition"
          >
            ✕
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-zinc-900 border border-zinc-700 rounded max-h-64 overflow-y-auto shadow-lg">

          {loading && (
            <div className="p-3 text-sm text-zinc-400">
              Cargando...
            </div>
          )}

          {!loading && folders.map((folder) => (
            <div
              key={folder.id}
              className="p-3 text-sm hover:bg-zinc-800 cursor-pointer transition"
              onClick={() => {
                onSelect(folder.id);
                setOpen(false);
              }}
            >
              {folder.name}
            </div>
          ))}

          {!loading && folders.length === 0 && (
            <div className="p-3 text-sm text-zinc-500 text-center">
              No hay carpetas
            </div>
          )}

        </div>
      )}
    </div>
  );
}