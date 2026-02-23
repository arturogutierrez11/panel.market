'use client';

import { Marketplace } from "@/src/core/entitis/madre/analitics/favorites/MarketplaceFavoriteProduct";


export function MarketplaceTabs({
  marketplaces,
  selected,
  onSelect,
  onCreate
}: {
  marketplaces: Marketplace[];
  selected?: number;
  onSelect: (id: number) => void;
  onCreate: () => void;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-800 pb-4 overflow-x-auto">

      {marketplaces.map((m) => (
        <button
          key={m.id}
          onClick={() => onSelect(m.id)}
          className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition ${
            selected === m.id
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
          }`}
        >
          {m.name}
        </button>
      ))}

      <button
        onClick={onCreate}
        className="px-4 py-2 text-sm rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition"
      >
        + Nuevo
      </button>
    </div>
  );
}