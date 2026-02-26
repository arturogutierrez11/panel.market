'use client';

import { useMemo, useState } from 'react';
import { deleteMarketplaceAction } from '../actions/deleteMarketplace.action';
import { DeleteMarketplaceRepository } from '@/src/core/driver/repository/madre/analitics/favorites/folders/delete/DeleteMarketplaceRepository';

export function useDeleteMarketplace() {
  const [loading, setLoading] = useState(false);

  const repository = useMemo(
    () => new DeleteMarketplaceRepository(),
    []
  );

  const deleteMarketplace = async (id: number) => {
    try {
      setLoading(true);
      return await deleteMarketplaceAction(repository, id);
    } finally {
      setLoading(false);
    }
  };

  return { deleteMarketplace, loading };
}