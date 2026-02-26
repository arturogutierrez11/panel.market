'use client';

import { useState, useEffect, useRef } from 'react';
import { Category } from '@/src/core/entitis/madre/analitics/products-analitycs/Category';

type Props = {
  categories: Category[];
  loading: boolean;
  search: (query: string) => void;
  onSelect: (categoryId: string) => void;
};

export function CategorySelect({
  categories,
  loading,
  search,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');

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
    setSelectedLabel('');
    setQuery('');
    onSelect('');
    search('');
  };

  const hasValue = selectedLabel || query;

  return (
    <div className="relative" ref={ref}>

      <label className="text-sm text-zinc-400">Categoría</label>

      <div className="relative">
        <input
          type="text"
          className="w-full mt-2 p-2 pr-8 bg-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          placeholder="Buscar categoría..."
          value={selectedLabel || query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setSelectedLabel('');
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

          {loading && (
            <div className="p-3 text-sm text-zinc-400">
              Buscando...
            </div>
          )}

          {!loading && categories.length === 0 && (
            <div className="p-3 text-sm text-zinc-500 text-center">
              Sin resultados
            </div>
          )}

          {!loading && categories.map((c) => (
            <div
              key={c.id}
              className="p-3 text-sm hover:bg-zinc-800 cursor-pointer transition"
              onClick={() => {
                setSelectedLabel(
                  `${'—'.repeat(c.level - 1)} ${c.name}`
                );
                setOpen(false);
                onSelect(c.id);
              }}
            >
              {'—'.repeat(c.level - 1)} {c.name}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}