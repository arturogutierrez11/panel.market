'use client';

import { CategoryProductsFilters } from '@/src/core/driver/repository/madre/analitics/categories-analitycs/categoriesProducts/GetCategoryProductsRepository';
import { useEffect, useState } from 'react';

type Props = {
  currentFilters: CategoryProductsFilters;
  onApply: (filters: CategoryProductsFilters) => void;
  onClose: () => void;
};

const MARKETPLACE_OPTIONS = ['megatone', 'oncity', 'fravega'];

export function CategoryFiltersModal({
  currentFilters,
  onApply,
  onClose
}: Props) {

  const [localFilters, setLocalFilters] =
    useState<CategoryProductsFilters>(currentFilters);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleChange = (
    key: keyof CategoryProductsFilters,
    value: any
  ) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleMarketplace = (name: string) => {
    const current = localFilters.excludeMarketplace ?? [];

    if (current.includes(name)) {
      handleChange(
        'excludeMarketplace',
        current.filter(m => m !== name)
      );
    } else {
      handleChange(
        'excludeMarketplace',
        [...current, name]
      );
    }
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
            placeholder="Min Price"
            value={localFilters.minPrice}
            onChange={e => handleChange('minPrice', e.target.value)}
            className="input"
          />
          <input
            placeholder="Max Price"
            value={localFilters.maxPrice}
            onChange={e => handleChange('maxPrice', e.target.value)}
            className="input"
          />
        </div>

        {/* VISITS */}
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Min Visits"
            value={localFilters.minVisits}
            onChange={e => handleChange('minVisits', e.target.value)}
            className="input"
          />
          <input
            placeholder="Max Visits"
            value={localFilters.maxVisits}
            onChange={e => handleChange('maxVisits', e.target.value)}
            className="input"
          />
        </div>

        {/* EXCLUDE MARKETPLACE */}
        <div>
          <p className="text-sm text-zinc-400 mb-2">
            Excluir publicados en:
          </p>

          <div className="flex gap-2">
            {MARKETPLACE_OPTIONS.map(name => (
              <button
                key={name}
                type="button"
                onClick={() => toggleMarketplace(name)}
                className={`px-3 py-1 text-xs rounded-full border ${
                  localFilters.excludeMarketplace?.includes(name)
                    ? 'bg-red-600 border-red-500 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-zinc-400"
          >
            Cancelar
          </button>

          <button
            onClick={() => onApply(localFilters)}
            className="px-4 py-2 text-sm bg-blue-600 rounded-lg text-white"
          >
            Aplicar
          </button>
        </div>

      </div>
    </div>
  );
}