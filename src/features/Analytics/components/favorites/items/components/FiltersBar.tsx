'use client';

import { useEffect, useMemo, useState } from 'react';
import { FavoritesFilters } from '@/src/core/driver/repository/madre/analitics/favorites/items/GetMarketplaceFavoritesRepository';
import { BrandItem, CategoryItem, GetCategoriesAndBrandsRepository } from '@/src/core/driver/repository/madre/analitics/favorites/items/GetCategoriesAndBrandsRepository';

type Props = {
  marketplaceId: number;
  onApply: (filters: FavoritesFilters) => void;
};

export function FiltersBar({ marketplaceId, onApply }: Props) {

  const [filters, setFilters] = useState<FavoritesFilters>({});

  const update = (key: keyof FavoritesFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === '' || value === undefined ? undefined : value
    }));
  };

  const handleApply = () => {
    onApply({ ...filters, page: 1 });
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

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Filtros
          </h2>

          <p className="text-xs text-zinc-500">
            Refiná los resultados de productos
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={handleClear}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm"
          >
            Limpiar
          </button>

          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium"
          >
            Aplicar filtros
          </button>

        </div>

      </div>

      {/* TOP FILTERS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <BrandFilter
          marketplaceId={marketplaceId}
          value={filters.brand}
          onChange={(brand) => update('brand', brand)}
        />

        <CategoryFilter
          marketplaceId={marketplaceId}
          value={filters.categoryId}
          onChange={(categoryId) => update('categoryId', categoryId)}
        />

      </div>

      {/* NUMERIC FILTERS */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        <NumberInput
          label="Precio mínimo"
          onChange={(v) => update('minPrice', v)}
        />

        <NumberInput
          label="Precio máximo"
          onChange={(v) => update('maxPrice', v)}
        />

        <NumberInput
          label="Stock mínimo"
          onChange={(v) => update('minStock', v)}
        />

        <NumberInput
          label="Stock máximo"
          onChange={(v) => update('maxStock', v)}
        />

        <NumberInput
          label="Visitas mínimas"
          onChange={(v) => update('minVisits', v)}
        />

        <NumberInput
          label="Visitas máximas"
          onChange={(v) => update('maxVisits', v)}
        />

        <NumberInput
          label="Órdenes mínimas"
          onChange={(v) => update('minOrders', v)}
        />

        <NumberInput
          label="Órdenes máximas"
          onChange={(v) => update('maxOrders', v)}
        />

        <SelectInput
          label="Ordenar por"
          options={[
            { value: 'price', label: 'Precio' },
            { value: 'visits', label: 'Visitas' },
            { value: 'soldQuantity', label: 'Órdenes' },
            { value: 'stock', label: 'Stock' },
          ]}
          onChange={(v) => update('sortBy', v)}
        />

        <SelectInput
          label="Dirección"
          options={[
            { value: 'asc', label: 'Ascendente' },
            { value: 'desc', label: 'Descendente' },
          ]}
          onChange={(v) => update('sortOrder', v)}
        />

        <NumberInput
          label="Resultados"
          onChange={(v) => update('limit', v)}
        />

      </div>

    </div>
  );
}

/* ---------------- COMPONENTES AUX ---------------- */

function NumberInput({
  label,
  onChange
}: {
  label: string
  onChange: (v?: number) => void
}) {

  return (
    <div>
      <label className="text-xs text-zinc-400 mb-1 block">
        {label}
      </label>

      <input
        type="number"
        className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white w-full"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

function SelectInput({
  label,
  options,
  onChange
}: {
  label: string
  options: { value: string, label: string }[]
  onChange: (v?: string) => void
}) {

  return (
    <div>

      <label className="text-xs text-zinc-400 mb-1 block">
        {label}
      </label>

      <select
        className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white w-full"
        onChange={(e) => onChange(e.target.value)}
      >

        <option value="">
          Seleccionar
        </option>

        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}

      </select>

    </div>
  )
}

/* ---------------- BRAND FILTER ---------------- */

function BrandFilter({
  marketplaceId,
  value,
  onChange
}: {
  marketplaceId: number
  value?: string
  onChange: (brand?: string) => void
}) {

  const repo = useMemo(() => new GetCategoriesAndBrandsRepository(), []);

  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const load = async () => {

      try {

        setLoading(true);

        const res = await repo.getBrands(marketplaceId, {
          page,
          limit: 8,
          search
        });

        setBrands(res.data);
        setTotalPages(res.pagination.totalPages);

      } finally {
        setLoading(false);
      }

    };

    load();

  }, [marketplaceId, search, page, repo]);

  return (

    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">

      <h3 className="text-sm font-semibold text-white">
        Marca
      </h3>

      <input
        placeholder="Buscar marca..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm w-full"
      />

      <div className="max-h-[180px] overflow-auto space-y-1">

        {loading && <Spinner />}

        {!loading && brands.map(b => (

          <button
            key={b.brand}
            onClick={() => onChange(b.brand)}
            className={`w-full flex justify-between px-3 py-2 rounded-lg text-sm border transition
            ${value === b.brand
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800'}
            `}
          >

            <span>{b.brand}</span>
            <span className="text-xs opacity-70">
              {b.totalProducts}
            </span>

          </button>

        ))}

      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

    </div>
  );
}

/* ---------------- CATEGORY FILTER ---------------- */

function CategoryFilter({
  marketplaceId,
  value,
  onChange
}: {
  marketplaceId: number
  value?: string
  onChange: (categoryId?: string) => void
}) {

  const repo = useMemo(() => new GetCategoriesAndBrandsRepository(), []);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const load = async () => {

      try {

        setLoading(true);

        const res = await repo.getCategories(marketplaceId, {
          page,
          limit: 8,
          search
        });

        setCategories(res.data);
        setTotalPages(res.pagination.totalPages);

      } finally {
        setLoading(false);
      }

    };

    load();

  }, [marketplaceId, search, page, repo]);

  return (

    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">

      <h3 className="text-sm font-semibold text-white">
        Categoría
      </h3>

      <input
        placeholder="Buscar categoría..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm w-full"
      />

      <div className="max-h-[180px] overflow-auto space-y-1">

        {loading && <Spinner />}

        {!loading && categories.map(c => (

          <button
            key={c.categoryId}
            onClick={() => onChange(c.categoryId)}
            className={`w-full flex justify-between px-3 py-2 rounded-lg text-sm border transition
            ${value === c.categoryId
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800'}
            `}
          >

            <span className="truncate">
              {c.categoryName}
            </span>

            <span className="text-xs opacity-70">
              {c.totalProducts}
            </span>

          </button>

        ))}

      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

    </div>
  );
}

/* ---------------- PAGINATION ---------------- */

function Pagination({
  page,
  totalPages,
  setPage
}: {
  page: number
  totalPages: number
  setPage: (page: number) => void
}) {

  return (

    <div className="flex justify-between items-center text-xs">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-2 py-1 bg-zinc-800 rounded disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-zinc-500">
        {page}/{totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-2 py-1 bg-zinc-800 rounded disabled:opacity-40"
      >
        Next
      </button>

    </div>

  );
}

function Spinner() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}