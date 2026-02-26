'use client';

import { useMemo, useState } from "react";
import { RemoveMarketplaceFavoritesBulkRepository } from "@/src/core/driver/repository/madre/analitics/favorites/items/delete/RemoveMarketplaceFavoritesBulkRepository";
import { removeMarketplaceFavoritesBulkAction } from "../actions/removeMarketplaceFavoritesBulkAction";

export function useRemoveMarketplaceFavoritesBulk() {
  const [loading, setLoading] = useState(false);

  const repository = useMemo(
    () => new RemoveMarketplaceFavoritesBulkRepository(),
    []
  );

  const removeBulk = async (
    marketplaceId: number,
    productIds: string[]
  ) => {
    try {
      setLoading(true);

      await removeMarketplaceFavoritesBulkAction(
        repository,
        marketplaceId,
        productIds
      );

    } finally {
      setLoading(false);
    }
  };

  return {
    removeBulk,
    loading,
  };
}