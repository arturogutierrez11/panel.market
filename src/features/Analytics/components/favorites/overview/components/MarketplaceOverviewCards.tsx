'use client';

import { useState } from 'react';
import { MarketplaceFullOverview } from "@/src/core/entitis/madre/analitics/favorites/MarketplaceFullOverview.entity";

type Props = {
  fullOverview: MarketplaceFullOverview;
};

export function MarketplaceOverviewCards({ fullOverview }: Props) {
  const { overview, brands, categories } = fullOverview;

  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const visibleBrands = showAllBrands ? brands : brands.slice(0, 8);
  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 8);

  const metricCardClass =
    "bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition";

  return (
    <div className="space-y-10">

      {/* ================= METRIC CARDS ================= */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Productos', value: overview.totalProducts },
          { label: 'Visitas', value: overview.totalVisits.toLocaleString() },
          { label: 'Órdenes', value: overview.totalOrders },
          { label: 'Revenue', value: `$${overview.totalRevenue.toLocaleString()}` },
          { label: 'Precio Promedio', value: `$${overview.avgPrice.toFixed(0)}` },
          { label: 'Ticket Promedio', value: `$${overview.avgTicket.toFixed(0)}` },
          { label: 'Marcas', value: overview.totalBrands },
          { label: 'Categorías', value: overview.totalCategories },
        ].map((card) => (
          <div key={card.label} className={metricCardClass}>
            <div className="text-xs text-zinc-500 uppercase tracking-wide">
              {card.label}
            </div>
            <div className="text-2xl font-semibold text-white mt-3">
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* ================= BRANDS ================= */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">
            Marcas
          </h3>

          {brands.length > 8 && (
            <button
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="text-sm text-blue-400 hover:text-blue-300 transition"
            >
              {showAllBrands ? 'Ver menos' : 'Ver todas'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {visibleBrands.map((b) => (
            <div
              key={b.brand}
              className="bg-zinc-800 rounded-xl px-4 py-4 hover:bg-zinc-700 transition"
            >
              <div className="text-white text-sm font-medium truncate">
                {b.brand}
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                {Number(b.totalProducts)} productos
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">
            Categorías
          </h3>

          {categories.length > 8 && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-sm text-blue-400 hover:text-blue-300 transition"
            >
              {showAllCategories ? 'Ver menos' : 'Ver todas'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleCategories.map((c) => (
            <div
              key={c.categoryId}
              className="bg-zinc-800 rounded-xl px-4 py-4 hover:bg-zinc-700 transition"
            >
              <div className="text-white text-sm font-semibold">
                {c.categoryName}
              </div>

              <div className="text-xs text-zinc-400 mt-1">
                {c.fullPath}
              </div>

              <div className="text-xs text-zinc-500 mt-2">
                {Number(c.totalProducts)} productos
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}