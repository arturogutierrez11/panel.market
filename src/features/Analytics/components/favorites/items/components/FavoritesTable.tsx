'use client';

import { MarketplaceFavoriteProduct } from "@/src/core/entitis/madre/analitics/favorites/MarketplaceFavoriteProduct";

type Props = {
  data: MarketplaceFavoriteProduct[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onRemove: (productId: string) => void;
  isClosed: boolean; 
};

export function FavoritesTable({
  data,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onRemove,
   isClosed  
}: Props) {

  const allSelected = data.length > 0 && selectedIds.length === data.length;

  const buildMercadoLibreUrl = (id: string) => {
    const prefix = id.slice(0, 3);
    const number = id.slice(3);
    return `https://articulo.mercadolibre.com.ar/${prefix}-${number}`;
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-800 text-zinc-400">
          <tr>
            <th className="p-4">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleSelectAll}
              />
            </th>
            <th className="p-4 text-left">Producto</th>
            <th className="p-4 text-left">Precio</th>
            <th className="p-4 text-left">Ventas</th>
            <th className="p-4 text-center">ML</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t border-zinc-800">
              <td className="p-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => onToggleSelect(item.id)}
                />
              </td>

              <td className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="text-white truncate max-w-[250px]">
                    {item.title}
                  </div>
                </div>
              </td>

              <td className="p-4 text-white">
                ${Number(item.price).toLocaleString()}
              </td>

              <td className="p-4 text-white">
                {item.soldQuantity}
              </td>

              <td className="p-4 text-center">
                <a
                  href={buildMercadoLibreUrl(item.id)}
                  target="_blank"
                  className="inline-block"
                >
                  <img
                    src="https://www.expoknews.com/wp-content/uploads/2020/03/1200px-MercadoLibre.svg-1.png"
                    className="h-6"
                  />
                </a>
              </td>

              <td className="p-4 text-right">
               <button
  disabled={isClosed}
  onClick={() => onRemove(item.id)}
  className={`text-sm ${
    isClosed
      ? "text-zinc-600 cursor-not-allowed"
      : "text-red-400"
  }`}
>
  Eliminar
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}