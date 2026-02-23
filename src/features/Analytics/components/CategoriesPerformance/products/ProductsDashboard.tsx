'use client';

import { useState, useMemo, useEffect } from 'react';
import { useProducts } from './hooks/useProducts';
import {
  GetProductsFilters,
  ProductItem,
} from '@/src/core/adapters/repository/madre/analitics/products/IGetProductsRepository';
import { useMarketplaces } from '../../favorites/hooks/useMarketplaces';
import { useMarketplaceFavoriteActions } from '../../favorites/hooks/useMarketplaceFavoriteActions';
import { FiltersModal } from '../filters/FiltersModal';

/* ================= COMPONENT ================= */

export default function ProductsDashboard() {
  const [filters, setFilters] = useState<GetProductsFilters>({
    page: 1,
    limit: 20,
    orderBy: 'visits',
    direction: 'desc',
  });

  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<number[]>([]);
  const [showMarketplaceModal, setShowMarketplaceModal] = useState(false);

  const { data, loading, error, refetch } = useProducts(filters);
  const { data: marketplaces = [] } = useMarketplaces();
  const { bulkAdd } = useMarketplaceFavoriteActions();

  /* ================= REMOVE DUPLICATES ================= */

  const uniqueItems = useMemo(() => {
    if (!data) return [];

    const map = new Map<string, ProductItem>();
    data.items.forEach(item => map.set(item.id, item));

    return Array.from(map.values());
  }, [data]);

  /* ================= FAVORITES ================= */

  const handleConfirmFavorites = async () => {
    if (selectedMarketplaces.length === 0) return;

    if (selectedProduct) {
      await bulkAdd(selectedMarketplaces, [{
        productId: selectedProduct.id,
        sellerSku: selectedProduct.seller_sku
      }]);
    }

    if (!selectedProduct && selected.size > 0) {
      const products = uniqueItems
        .filter(p => selected.has(p.id))
        .map(p => ({
          productId: p.id,
          sellerSku: p.seller_sku
        }));

      await bulkAdd(selectedMarketplaces, products);
    }

    setSelected(new Set());
    setSelectedProduct(null);
    setSelectedMarketplaces([]);
    setShowMarketplaceModal(false);

    await refetch();
  };

  /* ================= SELECTION ================= */

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    checked
      ? setSelected(new Set(uniqueItems.map(p => p.id)))
      : setSelected(new Set());
  };

  const toggleMarketplace = (id: number) => {
    setSelectedMarketplaces(prev =>
      prev.includes(id)
        ? prev.filter(m => m !== id)
        : [...prev, id]
    );
  };

  /* ================= KPI ================= */

  const summary = useMemo(() => {
    return {
      totalRevenue: uniqueItems.reduce(
        (acc, p) => acc + p.price * p.soldQuantity,
        0
      ),
      totalVisits: uniqueItems.reduce(
        (acc, p) => acc + p.visits,
        0
      ),
      totalSold: uniqueItems.reduce(
        (acc, p) => acc + p.soldQuantity,
        0
      ),
    };
  }, [uniqueItems]);

  /* ================= FILTER STATUS ================= */

  const hasActiveFilters =
    filters.brand ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minVisits ||
    filters.maxVisits ||
    filters.minOrders ||
    filters.maxOrders ||
    filters.excludeMarketplace;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters.page]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Análisis Global de Productos
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            {data.meta.total.toLocaleString()} productos encontrados
          </p>
        </div>

        <div className="flex gap-3">
          {selected.size > 0 && (
            <button
              onClick={() => setShowMarketplaceModal(true)}
              className="px-4 py-2 text-sm rounded-lg bg-yellow-500 text-black"
            >
              Guardar {selected.size}
            </button>
          )}

          <button
            onClick={() => setShowFilters(true)}
            className={`px-4 py-2 text-sm rounded-lg border ${
              hasActiveFilters
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300'
            }`}
          >
            Filtros
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-3 gap-6">
        <KPI label="Revenue Total" value={`$${summary.totalRevenue.toLocaleString()}`} />
        <KPI label="Visitas Totales" value={summary.totalVisits.toLocaleString()} />
        <KPI label="Unidades Vendidas" value={summary.totalSold.toLocaleString()} />
      </div>

      {/* TABLE */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selected.size === uniqueItems.length && uniqueItems.length > 0}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="px-4 py-3 text-left">Producto</th>
                <th className="px-4 py-3 text-right">Precio</th>
                <th className="px-4 py-3 text-right">Vendidos</th>
                <th className="px-4 py-3 text-right">Visitas</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 text-center">Publicaciones</th>
                <th className="px-4 py-3 text-center">Fav</th>
                <th className="px-4 py-3 text-center">+</th>
              </tr>
            </thead>

            <tbody>
              {uniqueItems.map((p) => {
                const revenue = p.price * p.soldQuantity;

                return (
                  <tr key={p.id} className="border-t border-zinc-800 hover:bg-zinc-900/40">

                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selected.has(p.id)}
                        onChange={() => toggleSelect(p.id)}
                      />
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex gap-3 items-center">
                        <img src={p.thumbnail} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="group relative max-w-[260px]">
                          <div className="text-white truncate cursor-pointer">
                            {p.title}
                          </div>

                          {/* FULL TITLE HOVER */}
                          <div className="absolute hidden group-hover:block bg-zinc-900 border border-zinc-700 p-3 rounded-lg text-xs w-80 z-30">
                            {p.title}
                          </div>

                          <div className="text-xs text-zinc-500">{p.id}</div>
                          <div className="text-xs text-zinc-400">SKU: {p.seller_sku}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-right text-white">
                      ${p.price.toLocaleString()}
                    </td>

                    <td className="px-4 py-4 text-right">
                      {p.soldQuantity}
                    </td>

                    <td className="px-4 py-4 text-right">
                      {p.visits}
                    </td>

                    <td className="px-4 py-4 text-right text-green-400">
                      ${revenue.toLocaleString()}
                    </td>

                    {/* MARKETPLACE HOVER COMPLETO */}
                    <td className="px-4 py-4 text-center">
                      {p.publishedMarketplaces?.length > 0 ? (
                        <div className="flex gap-2 justify-center flex-wrap">
                          {p.publishedMarketplaces.map((m, idx) => (
                            <div key={idx} className="relative group">
                              <span className="px-2 py-1 text-xs bg-blue-600 rounded-full text-white cursor-pointer">
                                {m.marketplace}
                              </span>

                              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition z-50">

                                <div className="flex justify-between">
                                  <span>Precio:</span>
                                  <span>${Number(m.price).toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between">
                                  <span>Stock:</span>
                                  <span className={m.stock < 5 ? 'text-red-400' : ''}>
                                    {m.stock}
                                  </span>
                                </div>

                                <div className="flex justify-between">
                                  <span>Status:</span>
                                  <span className={
                                    m.status === 'ACTIVE'
                                      ? 'text-green-400'
                                      : 'text-yellow-400'
                                  }>
                                    {m.status}
                                  </span>
                                </div>

                                <div className="flex justify-between">
                                  <span>Activo:</span>
                                  <span>{m.isActive ? 'Sí' : 'No'}</span>
                                </div>

                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-zinc-500 text-xs">
                          No publicado
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {p.isFavorite
                        ? <span className="text-green-500">✔</span>
                        : <span className="text-zinc-600">—</span>}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedProduct(p);
                          setShowMarketplaceModal(true);
                        }}
                        className="text-yellow-400 hover:scale-125"
                      >
                        ＋
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {data.meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            disabled={!data.meta.hasPrev}
            onClick={() =>
              setFilters(prev => ({ ...prev, page: (prev.page ?? 1) - 1 }))
            }
            className="px-4 py-2 bg-zinc-800 rounded-lg text-white disabled:opacity-40"
          >
            Anterior
          </button>

          <span className="text-zinc-400">
            Página {data.meta.page} de {data.meta.totalPages}
          </span>

          <button
            disabled={!data.meta.hasNext}
            onClick={() =>
              setFilters(prev => ({ ...prev, page: (prev.page ?? 1) + 1 }))
            }
            className="px-4 py-2 bg-zinc-800 rounded-lg text-white disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* FILTER MODAL */}
      {showFilters && (
        <FiltersModal
          currentFilters={filters}
          onApply={(newFilters) => {
            setFilters({ ...newFilters, page: 1 });
            setShowFilters(false);
          }}
          onClose={() => setShowFilters(false)}
        />
      )}

    </div>
  );
}

/* ================= UI HELPERS ================= */

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="text-xl font-semibold text-white mt-1">
        {value}
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="p-16 text-center text-zinc-500 animate-pulse">
      Cargando productos...
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="p-16 text-center text-red-400">
      {message}
    </div>
  );
}