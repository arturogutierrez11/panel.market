'use client';

import { useState, useMemo } from "react";
import { useMarketplaceFavorites } from "../hooks/useMarketplaceFavorites";
import { useRemoveMarketplaceFavoritesBulk } from "../hooks/useRemoveMarketplaceFavoritesBulk";
import { BulkActionsBar } from "./BulkActionsBar";
import { FavoritesTable } from "./FavoritesTable";
import { Pagination } from "./Pagination";
import { FiltersBar } from "./FiltersBar";
import { FavoritesFilters } from "@/src/core/driver/repository/madre/analitics/favorites/items/GetMarketplaceFavoritesRepository";

import { GetFoldersRepository } from "@/src/core/driver/repository/madre/analitics/favorites/folders/get/GetFoldersRepository";
import { useFolders } from "@/src/features/Analytics/components/products-analitycs/hooks/useFolders";

export function FavoritesProductsContainer({
  marketplaceId
}: {
  marketplaceId: number;
}) {

  /* ================= DATA ================= */

  const {
    data,
    pagination,
    reload
  } = useMarketplaceFavorites(marketplaceId);

  const { removeBulk } = useRemoveMarketplaceFavoritesBulk();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<FavoritesFilters>({});

  /* ================= FOLDER STATUS ================= */

  const foldersRepo = useMemo(
    () => new GetFoldersRepository(),
    []
  );

  const { folders } = useFolders(foldersRepo);

  const currentFolder = folders.find(f => f.id === marketplaceId);
  const isClosed = currentFolder?.status === "closed";

  /* ================= SELECTION ================= */

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map(p => p.id));
    }
  };

  /* ================= FILTERS ================= */

  const handleApplyFilters = (filters: FavoritesFilters) => {
    setActiveFilters(filters);
    reload(filters);
  };

  /* ================= REMOVE ================= */

  const handleRemoveSelected = async () => {
    if (isClosed) {
      alert("La carpeta está cerrada y no se puede modificar.");
      return;
    }

    await removeBulk(marketplaceId, selectedIds);
    setSelectedIds([]);
    reload(activeFilters);
  };

  const handleRemoveSingle = async (id: string) => {
    if (isClosed) {
      alert("La carpeta está cerrada y no se puede modificar.");
      return;
    }

    await removeBulk(marketplaceId, [id]);
    reload(activeFilters);
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">

      {isClosed && (
        <div className="bg-yellow-900/40 border border-yellow-700 text-yellow-300 text-sm px-4 py-2 rounded-lg">
          Esta carpeta está cerrada. No se pueden modificar los favoritos.
        </div>
      )}

      <FiltersBar
        marketplaceId={marketplaceId}
        onApply={handleApplyFilters}
      />

      <BulkActionsBar
        selectedCount={selectedIds.length}
        onRemoveSelected={handleRemoveSelected}
        disabled={isClosed}
      />

      <FavoritesTable
  data={data}
  selectedIds={selectedIds}
  onToggleSelect={toggleSelect}
  onToggleSelectAll={toggleSelectAll}
  onRemove={handleRemoveSingle}
  isClosed={isClosed}   
/>

      {pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={(newPage) =>
            reload({ ...activeFilters, page: newPage })
          }
        />
      )}
    </div>
  );
}