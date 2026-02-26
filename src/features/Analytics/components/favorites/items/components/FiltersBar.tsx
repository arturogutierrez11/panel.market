'use client';

import { useState } from 'react';
import { FavoritesFilters } from '@/src/core/driver/repository/madre/analitics/favorites/items/GetMarketplaceFavoritesRepository';
import { useMarketplaceFullOverview } from '../../overview/hooks/useMarketplaceFullOverview';

type Props = {
  marketplaceId: number;
  onApply: (filters: FavoritesFilters) => void;
};

export function FiltersBar({ marketplaceId, onApply }: Props) {
  const [filters, setFilters] = useState<FavoritesFilters>({});

  const { data: overviewData } =
    useMarketplaceFullOverview(marketplaceId);

  const categories = overviewData?.categories ?? [];

  const update = (key: keyof FavoritesFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]:
        value === '' || value === undefined
          ? undefined
          : value
    }));
  };

  const handleApply = () => {
    onApply({
      ...filters,
      page: 1
    });
  };

  const handleClear = () => {
    setFilters({});
    onApply({ page: 1 });
  };

  const inputClass =
    "bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition w-full";

  const labelClass =
    "text-xs text-zinc-400 mb-1 block";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 shadow-lg">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white tracking-wide">
          Filtros avanzados
        </h2>

        <div className="flex gap-3">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm transition"
          >
            Limpiar
          </button>

          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium transition"
          >
            Aplicar
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {/* ✅ MARCA SELECT DINÁMICO */}
<div>
  <label className={labelClass}>Marca</label>
  <select
    className={inputClass}
    onChange={e => update('brand', e.target.value)}
  >
    <option value="">Todas las marcas</option>

    {overviewData?.brands
      ?.sort((a, b) =>
        a.brand.localeCompare(b.brand)
      )
      .map((b) => (
        <option
          key={b.brand}
          value={b.brand}
        >
          {b.brand} ({b.totalProducts})
        </option>
      ))}
  </select>
</div>

        {/* ✅ CATEGORÍA SELECT DINÁMICO */}
        <div>
          <label className={labelClass}>Categoría</label>
          <select
            className={inputClass}
            onChange={e => update('categoryId', e.target.value)}
          >
            <option value="">Todas las categorías</option>

            {categories.map((cat) => (
              <option
                key={cat.categoryId}
                value={cat.categoryId}
              >
                {cat.fullPath ?? cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* PRECIO */}
        <div>
          <label className={labelClass}>Precio mínimo</label>
          <input
            type="number"
            className={inputClass}
            onChange={e => update('minPrice', Number(e.target.value))}
          />
        </div>

        <div>
          <label className={labelClass}>Precio máximo</label>
          <input
            type="number"
            className={inputClass}
            onChange={e => update('maxPrice', Number(e.target.value))}
          />
        </div>

        {/* STOCK */}
        <div>
          <label className={labelClass}>Stock mínimo</label>
          <input
            type="number"
            className={inputClass}
            onChange={e => update('minStock', Number(e.target.value))}
          />
        </div>

        <div>
          <label className={labelClass}>Stock máximo</label>
          <input
            type="number"
            className={inputClass}
            onChange={e => update('maxStock', Number(e.target.value))}
          />
        </div>

        {/* VISITAS */}
        <div>
          <label className={labelClass}>Visitas mínimas</label>
          <input
            type="number"
            className={inputClass}
            onChange={e => update('minVisits', Number(e.target.value))}
          />
        </div>

        <div>
          <label className={labelClass}>Visitas máximas</label>
          <input
            type="number"
            className={inputClass}
            onChange={e => update('maxVisits', Number(e.target.value))}
          />
        </div>

        {/* ÓRDENES */}
        <div>
          <label className={labelClass}>Órdenes mínimas</label>
          <input
            type="number"
            className={inputClass}
            onChange={e => update('minOrders', Number(e.target.value))}
          />
        </div>

        <div>
          <label className={labelClass}>Órdenes máximas</label>
          <input
            type="number"
            className={inputClass}
            onChange={e => update('maxOrders', Number(e.target.value))}
          />
        </div>

        {/* SORT */}
        <div>
          <label className={labelClass}>Ordenar por</label>
          <select
            className={inputClass}
            onChange={e => update('sortBy', e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="price">Precio</option>
            <option value="visits">Visitas</option>
            <option value="soldQuantity">Órdenes</option>
            <option value="stock">Stock</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Dirección</label>
          <select
            className={inputClass}
            onChange={e => update('sortOrder', e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>

        {/* LÍMITE */}
        <div>
          <label className={labelClass}>Resultados por página</label>
          <input
            type="number"
            className={inputClass}
            onChange={e => update('limit', Number(e.target.value))}
          />
        </div>

      </div>
    </div>
  );
}