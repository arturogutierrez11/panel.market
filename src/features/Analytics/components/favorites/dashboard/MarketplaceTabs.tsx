'use client';

import { Marketplace } from "@/src/core/entitis/madre/analitics/favorites/folder/status/marketplace.types";

type Props = {
  marketplaces: Marketplace[];
  selected?: number;
  onSelect: (id: number) => void;
  onCreate: () => void;
};

export function MarketplaceTabs({
  marketplaces,
  selected,
  onSelect,
  onCreate,
}: Props) {
  return (
    <div className="flex items-center gap-3 flex-wrap">

      {/* TABS */}
      {marketplaces.map((marketplace) => {
        const isActive = selected === marketplace.id;
        const isClosed = marketplace.status === 'closed';

        return (
          <button
            key={marketplace.id}
            onClick={() => onSelect(marketplace.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
              ${
                isActive
                  ? 'bg-white text-black shadow-md'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span>{marketplace.name}</span>

              {isClosed ? (
                /* 🔒 Candado gris */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 10-8 0v4M5 11h14v9H5z"
                  />
                </svg>
              ) : (
                /* 🟢 Punto verde */
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </div>
          </button>
        );
      })}

      {/* BOTÓN CREAR */}
      <button
        type="button"
        onClick={onCreate}
        className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition"
      >
        + Nueva carpeta
      </button>
    </div>
  );
}