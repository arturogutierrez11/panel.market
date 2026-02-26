'use client';

import { useState, useRef, useEffect } from 'react';
import { Brand } from '@/src/core/entitis/madre/analitics/brands-analitycs/Brand';

type Props = {
  brands: Brand[];
  loading: boolean;
  hasMore: boolean;
  search: (query: string) => void;
  onLoadMore: () => void;
  onSelect: (brand: string) => void;
};

export function BrandSelect({
  brands,
  loading,
  hasMore,
  search,
  onLoadMore,
  onSelect,
}: Props) {

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string>('');

  const ref = useRef<HTMLDivElement>(null);

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

  /* Debounced search */
  useEffect(() => {
    const timeout = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, search]);

  const handleClear = () => {
    setSelected('');
    setQuery('');
    onSelect('');
    search('');
  };

  const hasValue = selected || query;

  return (
    <div className="relative" ref={ref}>
      <label className="text-sm text-zinc-400">Marca</label>

      <div className="relative">
        <input
          type="text"
          className="w-full mt-2 p-2 pr-8 bg-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          value={selected || query}
          placeholder="Buscar marca..."
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setSelected('');
            setQuery(e.target.value);
          }}
        />

        {/* BOTÓN LIMPIAR */}
        {hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-[14px] text-zinc-400 hover:text-white transition"
          >
            ✕
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-zinc-900 border border-zinc-700 rounded max-h-64 overflow-y-auto shadow-lg">

          {brands.map((b) => (
            <div
              key={b.name}
              className="p-3 text-sm hover:bg-zinc-800 cursor-pointer transition"
              onClick={() => {
                setSelected(b.name);
                setOpen(false);
                onSelect(b.name);
              }}
            >
              {b.name}
            </div>
          ))}

          {loading && (
            <div className="p-3 text-sm text-zinc-400">
              Cargando...
            </div>
          )}

          {!loading && hasMore && (
            <div
              className="p-3 text-sm text-blue-400 cursor-pointer hover:bg-zinc-800 text-center transition"
              onClick={(e) => {
                e.stopPropagation();
                onLoadMore();
              }}
            >
              Ver más
            </div>
          )}

          {!loading && brands.length === 0 && (
            <div className="p-3 text-sm text-zinc-500 text-center">
              Sin resultados
            </div>
          )}

        </div>
      )}
    </div>
  );
}