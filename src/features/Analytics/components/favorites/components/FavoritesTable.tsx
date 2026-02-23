'use client';

import { MarketplaceFavoriteProduct } from "@/src/core/entitis/madre/analitics/favorites/MarketplaceFavoriteProduct";


export function FavoritesTable({
  products,
  onRemove
}: {
  products: MarketplaceFavoriteProduct[];
  onRemove: (product: MarketplaceFavoriteProduct) => void;
}) {
  if (products.length === 0) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center text-zinc-500">
        No hay favoritos en este marketplace
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-4 text-left">Producto</th>
              <th className="px-6 py-4 text-right">Precio</th>
              <th className="px-6 py-4 text-right">Revenue</th>
              <th className="px-6 py-4 text-right">Visitas</th>
              <th className="px-6 py-4 text-right">Vendidos</th>
              <th className="px-6 py-4 text-center"></th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-t border-zinc-800 hover:bg-zinc-900/50 transition"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="text-white font-medium line-clamp-1">
                        {p.title}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {p.id}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-right text-white">
                  ${p.price.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-right text-green-400 font-semibold">
                  ${p.revenue.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-right text-zinc-300">
                  {p.visits.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-right text-zinc-300">
                  {p.soldQuantity.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onRemove(p)}
                    className="text-red-400 hover:text-red-300 transition text-sm"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}