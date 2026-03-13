'use client';

import { useEffect, useMemo, useState } from "react";
import { MarketplaceOverview } from "@/src/core/entitis/madre/analitics/favorites/folder/overview/MarketplaceOverview";
import {
  BrandItem,
  CategoryItem,
  GetCategoriesAndBrandsRepository
} from "@/src/core/driver/repository/madre/analitics/favorites/items/GetCategoriesAndBrandsRepository";

type Props = {
  marketplaceId: number;
  overview: MarketplaceOverview;
};

export function MarketplaceOverviewCards({ overview, marketplaceId }: Props) {

  if (!marketplaceId) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

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
    <div className="space-y-8">

      {/* METRICS */}
<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-5">  
        {cards.map((card) => (
  <div
    key={card.label}
    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition group"
  >
    <div className="text-[11px] text-zinc-500 uppercase tracking-wider">
      {card.label}
    </div>

    <div className="text-2xl font-semibold text-white mt-2 group-hover:text-blue-400 transition">
      {card.value}
    </div>
  </div>
))}
      </div>

      {/* BREAKDOWNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BrandsList marketplaceId={marketplaceId} />
        <CategoriesList marketplaceId={marketplaceId} />
      </div>

    </div>
  );
}

function BrandsList({ marketplaceId }: { marketplaceId: number }) {

  const repo = useMemo(() => new GetCategoriesAndBrandsRepository(), []);

  const [inputSearch, setInputSearch] = useState("");
  const [search, setSearch] = useState("");

  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!marketplaceId) return;

    const load = async () => {

      try {

        setLoading(true);

        const res = await repo.getBrands(marketplaceId, {
          page,
          limit: 10,
          search: search.trim() || undefined
        });

        setBrands(res.data);
        setTotalPages(res.pagination.totalPages);

      } catch (err) {
        console.error("Error loading brands", err);
      } finally {
        setLoading(false);
      }

    };

    load();

  }, [marketplaceId, search, page, repo]);

  const handleSearch = () => {
    setPage(1);
    setSearch(inputSearch);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col h-[500px]">

      <h3 className="text-sm font-semibold text-white mb-4">
        Marcas
      </h3>

      <div className="flex gap-2 mb-4">

        <input
          placeholder="Buscar marca..."
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white"
        />

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm text-white"
        >
          Buscar
        </button>

      </div>

     <div className="flex-1 overflow-auto pr-1 space-y-1">

  {loading && <Spinner />}

  {!loading && brands.map((b) => (
    <div
      key={b.brand}
      className="flex justify-between items-center text-sm text-zinc-300 border border-zinc-800 rounded-lg px-3 py-2 hover:bg-zinc-800/60 transition"
    >
      <span className="truncate max-w-[70%]">
        {b.brand}
      </span>

      <span className="text-xs text-zinc-400 font-medium">
        {Number(b.totalProducts).toLocaleString()}
      </span>
    </div>
  ))}

</div>

      {/* PAGINATION */}

      <div className="flex justify-between items-center pt-4">

        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 bg-zinc-800 rounded-lg text-xs disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-xs text-zinc-500">
          Página {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 bg-zinc-800 rounded-lg text-xs disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  );
}

function CategoriesList({ marketplaceId }: { marketplaceId: number }) {

  const repo = useMemo(() => new GetCategoriesAndBrandsRepository(), []);

  const [inputSearch, setInputSearch] = useState("");
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!marketplaceId) return;

    const load = async () => {

      try {

        setLoading(true);

        const res = await repo.getCategories(marketplaceId, {
          page,
          limit: 10,
          search: search.trim() || undefined
        });

        setCategories(res.data);
        setTotalPages(res.pagination.totalPages);

      } catch (err) {
        console.error("Error loading categories", err);
      } finally {
        setLoading(false);
      }

    };

    load();

  }, [marketplaceId, search, page, repo]);

  const handleSearch = () => {
    setPage(1);
    setSearch(inputSearch);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col h-[500px]">

      <h3 className="text-sm font-semibold text-white mb-4">
        Categorías
      </h3>

      <div className="flex gap-2 mb-4">

        <input
          placeholder="Buscar categoría..."
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white"
        />

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm text-white"
        >
          Buscar
        </button>

      </div>

      <div className="flex-1 overflow-auto space-y-2">

        {loading && <Spinner />}

        {!loading && categories.map((c) => (
          <div
            key={c.categoryId}
            className="flex justify-between items-center text-sm text-zinc-300 border-b border-zinc-800 pb-2"
          >
            <span>{c.categoryName}</span>

            <span className="text-zinc-500">
              {c.totalProducts}
            </span>
          </div>
        ))}

      </div>

      <div className="flex justify-between items-center pt-4">

        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 bg-zinc-800 rounded-lg text-xs disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-xs text-zinc-500">
          Página {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 bg-zinc-800 rounded-lg text-xs disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  );
}

/* SPINNER */

function Spinner() {
  return (
    <div className="flex justify-center py-6">
      <div className="w-6 h-6 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}