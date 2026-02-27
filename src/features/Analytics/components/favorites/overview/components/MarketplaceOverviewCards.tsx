'use client';

import { MarketplaceOverview } from "@/src/core/entitis/madre/analitics/favorites/folder/overview/MarketplaceOverview";

type Props = {
  overview: MarketplaceOverview;
};

export function MarketplaceOverviewCards({ overview }: Props) {
  const metricCardClass =
    "bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition";

  const cards = [
    { label: 'Productos', value: overview.totalProducts },
    { label: 'Visitas', value: overview.totalVisits.toLocaleString() },
    { label: 'Órdenes', value: overview.totalOrders },
    { label: 'Revenue', value: `$${overview.totalRevenue.toLocaleString()}` },
    { label: 'Precio Promedio', value: `$${overview.avgPrice.toFixed(0)}` },
    { label: 'Ticket Promedio', value: `$${overview.avgTicket.toFixed(0)}` },
    { label: 'Marcas', value: overview.totalBrands },
    { label: 'Categorías', value: overview.totalCategories },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map((card) => (
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
  );
}