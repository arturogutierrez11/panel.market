import { useState } from "react";
import { useMarketplaceFavorites } from "../hooks/useMarketplaceFavorites";
import { useRemoveMarketplaceFavoritesBulk } from "../hooks/useRemoveMarketplaceFavoritesBulk";
import { BulkActionsBar } from "./BulkActionsBar";
import { FavoritesTable } from "./FavoritesTable";
import { Pagination } from "./Pagination";
import { FiltersBar } from "./FiltersBar";
import { FavoritesFilters } from "@/src/core/driver/repository/madre/analitics/favorites/items/GetMarketplaceFavoritesRepository";

export function FavoritesProductsContainer({
  marketplaceId
}: {
  marketplaceId: number;
}) {
  const {
    data,
    pagination,
    reload
  } = useMarketplaceFavorites(marketplaceId);

  const { removeBulk } = useRemoveMarketplaceFavoritesBulk();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<FavoritesFilters>({});

  const currentFolder = folders.find(f => f.id === marketplaceId);
const isClosed = currentFolder?.status === 'closed';

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

  const handleApplyFilters = (filters: FavoritesFilters) => {
    setActiveFilters(filters);
    reload(filters);
  };

  const handleRemoveSelected = async () => {
    await removeBulk(marketplaceId, selectedIds);
    setSelectedIds([]);
    reload(activeFilters);
  };

  return (
    <div className="space-y-6">

      <FiltersBar
  marketplaceId={marketplaceId}
  onApply={handleApplyFilters}
/>

      {/* 🔴 BULK ACTIONS */}
      <BulkActionsBar
        selectedCount={selectedIds.length}
        onRemoveSelected={handleRemoveSelected}
      />

      {/* 📋 TABLA */}
      <FavoritesTable
        data={data}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        onRemove={async (id) => {
          await removeBulk(marketplaceId, [id]);
          reload(activeFilters);
        }}
      />

      {/* 📄 PAGINACIÓN */}
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