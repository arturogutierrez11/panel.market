'use client';

import { useMemo, useState } from 'react';
import { updateMarketplaceStatusAction } from '../actions/updateMarketplaceStatus.action';
import { UpdateMarketplaceStatusRepository } from '@/src/core/driver/repository/madre/analitics/favorites/folders/status/UpdateMarketplaceStatusRepository';

export function useUpdateMarketplaceStatus() {
  const [loading, setLoading] = useState(false);

  const repository = useMemo(
    () => new UpdateMarketplaceStatusRepository(),
    []
  );

  const updateStatus = async (
    id: number,
    status: 'active' | 'closed'
  ) => {
    try {
      setLoading(true);
      return await updateMarketplaceStatusAction(
        repository,
        id,
        status
      );
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading };
}