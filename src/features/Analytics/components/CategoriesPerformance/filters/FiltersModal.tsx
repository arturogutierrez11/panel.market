'use client';

import { GetProductsFilters } from '@/src/core/adapters/repository/madre/analitics/products/IGetProductsRepository';
import { useEffect, useState } from 'react';

type Props = {
  currentFilters: GetProductsFilters;
  onApply: (filters: GetProductsFilters) => void;
  onClose: () => void;
};

const MARKETPLACES = ['megatone', 'oncity', 'fravega'];

export function FiltersModal({
  currentFilters,
  onApply,
  onClose
}: Props) {

  const [localFilters, setLocalFilters] =
    useState<GetProductsFilters>(currentFilters);

  const [excluded, setExcluded] =
    useState<string[]>(
      currentFilters.excludeMarketplace
        ? currentFilters.excludeMarketplace.split(',')
        : []
    );

  useEffect(() => {
    setLocalFilters(currentFilters);

    setExcluded(
      currentFilters.excludeMarketplace
        ? currentFilters.excludeMarketplace.split(',')
        : []
    );
  }, [currentFilters]);

  const handleChange = (
    key: keyof GetProductsFilters,
    value: any
  ) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleMarketplace = (name: string) => {
    setExcluded(prev =>
      prev.includes(name)
        ? prev.filter(m => m !== name)
        : [...prev, name]
    );
  };

  const handleApply = () => {
    onApply({
      ...localFilters,
      excludeMarketplace:
        excluded.length > 0
          ? excluded.join(',')
          : undefined
    });
  };

  const handleClear = () => {
    const cleared: GetProductsFilters = {
      page: 1,
      limit: 20,
      orderBy: 'visits',
      direction: 'desc',
    };

    setExcluded([]);
    setLocalFilters(cleared);
    onApply(cleared);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 w-[520px] space-y-6">

        <h3 className="text-white font-semibold text-lg">
          Filtros
        </h3>

        {/* PRICE */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min Price"
            value={localFilters.minPrice ?? ''}
            onChange={e =>
              handleChange(
                'minPrice',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            className="input"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={localFilters.maxPrice ?? ''}
            onChange={e =>
              handleChange(
                'maxPrice',
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            className="input"
          />
        </div>

        {/* EXCLUDE MARKETPLACE */}
        <div>
          <p className="text-sm text-zinc-400 mb-2">
            Excluir productos publicados en:
          </p>

          <div className="flex flex-wrap gap-2">
            {MARKETPLACES.map(name => (
              <button
                key={name}
                type="button"
                onClick={() => toggleMarketplace(name)}
                className={`px-3 py-1 text-xs rounded-full border transition ${
                  excluded.includes(name)
                    ? 'bg-red-600 border-red-500 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white"
          >
            Limpiar
          </button>

          <button
            onClick={handleApply}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          >
            Aplicar
          </button>
        </div>

      </div>
    </div>
  );
}