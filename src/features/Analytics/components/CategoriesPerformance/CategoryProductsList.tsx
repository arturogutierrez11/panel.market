'use client';

import { useEffect, useState } from 'react';
import { useCategoryProducts } from './hook/useCategoryProducts';
import { useMarketplaceFavoriteActions } from '../favorites/hooks/useMarketplaceFavoriteActions';
import { FiltersModal } from './filters/FiltersModal';

import {
  CategoryProduct,
  CategoryProductsFilters
} from '@/src/core/driver/repository/madre/analitics/categoriesProducts/GetCategoryProductsRepository';
import { CategoryFiltersModal } from './filters/CategoryFiltersModal';

type Props = {
  categoryId: string;
};

const defaultFilters: CategoryProductsFilters = {
  minPrice: '',
  maxPrice: '',
  minVisits: '',
  maxVisits: '',
  minOrders: '',
  maxOrders: '',
  minRevenue: '',
  maxRevenue: '',
  excludeMarketplace: []
};

export default function CategoryProductsList({ categoryId }: Props) {

  /* ================= STATES ================= */

  const [page, setPage] = useState(1);

  const [filters, setFilters] =
    useState<CategoryProductsFilters>(defaultFilters);

  const [showFilters, setShowFilters] = useState(false);

  const [selected, setSelected] =
    useState<Set<string>>(new Set());

  const [selectedProduct, setSelectedProduct] =
    useState<CategoryProduct | null>(null);

  const [showMarketplaceModal, setShowMarketplaceModal] =
    useState(false);

  const [selectedMarketplaces, setSelectedMarketplaces] =
    useState<number[]>([]);

  const [localItems, setLocalItems] =
    useState<CategoryProduct[]>([]);

  /* ================= HOOK ================= */

  const { bulkAdd } = useMarketplaceFavoriteActions();

  const {
    items,
    meta,
    loading,
    error,
    refetch
  } = useCategoryProducts(categoryId, page, 20, filters);

  /* ================= EFFECTS ================= */

  useEffect(() => {
    setLocalItems(items);
    setSelected(new Set());
  }, [items]);

  useEffect(() => {
    setPage(1);
  }, [filters, categoryId]);

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
      const products = localItems
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
      const newSet = new Set(prev);
      newSet.has(id)
        ? newSet.delete(id)
        : newSet.add(id);
      return newSet;
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    checked
      ? setSelected(new Set(localItems.map(p => p.id)))
      : setSelected(new Set());
  };

  const toggleMarketplace = (id: number) => {
    setSelectedMarketplaces(prev =>
      prev.includes(id)
        ? prev.filter(m => m !== id)
        : [...prev, id]
    );
  };

  const hasActiveFilters = Object.values(filters).some(
    v =>
      (Array.isArray(v) && v.length > 0) ||
      (!Array.isArray(v) && v !== '')
  );

  /* ================= RENDER ================= */

  return (
    <>
      <div className="space-y-6 m-4">

        {/* HEADER */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Productos
            </h2>
            {meta && (
              <p className="text-sm text-zinc-400">
                {meta.total.toLocaleString()} productos
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">

            {selected.size > 0 && (
              <button
                onClick={() => setShowMarketplaceModal(true)}
                className="px-4 py-2 text-sm rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition"
              >
                Guardar {selected.size}
              </button>
            )}

            <button
              onClick={() => setShowFilters(true)}
              className={`px-4 py-2 text-sm rounded-lg border transition ${
                hasActiveFilters
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              Filtros
            </button>

          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-lg">

          {loading ? (
            <div className="py-16 text-center text-zinc-500 animate-pulse">
              Cargando...
            </div>
          ) : error ? (
            <div className="py-16 text-center text-red-400">
              {error}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">

                  <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs tracking-wide">
                    <tr>
                      <th className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={
                            selected.size === localItems.length &&
                            localItems.length > 0
                          }
                          onChange={(e) =>
                            toggleSelectAll(e.target.checked)
                          }
                          className="accent-blue-600"
                        />
                      </th>
                      <th className="px-4 py-3 text-left">Producto</th>
                      <th className="px-4 py-3 text-center">Métricas</th>
                      <th className="px-4 py-3 text-center">Publicaciones</th>
                      <th className="px-4 py-3 text-center">Favorito</th>
                      <th className="px-4 py-3 text-center">+</th>
                    </tr>
                  </thead>

                  <tbody>
                    {localItems.map(product => (
                      <tr
                        key={product.id}
                        className="border-t border-zinc-800 hover:bg-zinc-900/40 transition"
                      >
                        {/* SELECT */}
                        <td className="px-4 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={selected.has(product.id)}
                            onChange={() => toggleSelect(product.id)}
                            className="accent-blue-600"
                          />
                        </td>

                        {/* PRODUCT */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={product.thumbnail}
                              className="w-14 h-14 rounded-lg object-cover"
                            />
                            <div>
                              <div className="text-white font-medium line-clamp-1">
                                {product.title}
                              </div>
                              <div className="text-xs text-zinc-500">
                                {product.id}
                              </div>
                              <div className="text-xs text-zinc-400">
                                SKU: {product.seller_sku}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* METRICS */}
                        <td className="px-4 py-4 text-center text-xs space-y-1">
                          <div className="text-white">
                            ${product.price.toLocaleString()}
                          </div>
                          <div className="text-zinc-400">
                            Vendidos: {product.soldQuantity}
                          </div>
                          <div className="text-zinc-400">
                            Visitas: {product.visits}
                          </div>
                          <div className="text-green-400 font-semibold">
                            Revenue: ${product.revenue.toLocaleString()}
                          </div>
                        </td>

                        {/* PUBLICATIONS */}
                        <td className="px-4 py-4 text-center">
                          {product.publishedMarketplaces.length > 0 ? (
                            <div className="flex flex-wrap gap-2 justify-center">
                              {product.publishedMarketplaces.map((m, idx) => (
                                <div key={idx} className="relative group">
                                  <span className="px-2 py-1 text-xs bg-blue-600 rounded-full text-white cursor-pointer">
                                    {m.marketplace}
                                  </span>

                                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-56 bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition pointer-events-none z-20">
                                    <div className="flex justify-between">
                                      <span>Precio:</span>
                                      <span>${Number(m.price).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Stock:</span>
                                      <span>{m.stock}</span>
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

                        {/* FAVORITE */}
                        <td className="px-4 py-4 text-center">
                          {product.isFavorite ? (
                            <span className="text-green-500 text-lg">✔</span>
                          ) : (
                            <span className="text-zinc-600">—</span>
                          )}
                        </td>

                        {/* ADD */}
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowMarketplaceModal(true);
                            }}
                            className="text-yellow-400 hover:scale-125 transition"
                          >
                            ＋
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              {/* PAGINATION */}
              {meta && meta.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6 pb-6">
                  <button
                    disabled={!meta.hasPrev}
                    onClick={() => {
                      setPage(prev => prev - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 text-sm rounded-lg ${
                      meta.hasPrev
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                        : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    Anterior
                  </button>

                  <div className="text-sm text-zinc-400">
                    Página <span className="text-white font-semibold">
                      {meta.page}
                    </span> de {meta.totalPages}
                  </div>

                  <button
                    disabled={!meta.hasNext}
                    onClick={() => {
                      setPage(prev => prev + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 text-sm rounded-lg ${
                      meta.hasNext
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                        : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    Siguiente
                  </button>
                </div>
              )}

            </>
          )}
        </div>
      </div>

      {showFilters && (
  <CategoryFiltersModal
    currentFilters={filters}
    onApply={(newFilters) => {
      setFilters(newFilters);
      setShowFilters(false);
    }}
    onClose={() => setShowFilters(false)}
  />
)}
      {/* MARKETPLACE MODAL */}
      {showMarketplaceModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 w-96 space-y-4">
            <h3 className="text-white font-semibold">
              Seleccionar Marketplaces
            </h3>

            {/* Acá podés poner los marketplaces reales */}
          </div>
        </div>
      )}

    </>
  );
}