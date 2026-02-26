'use client';

import { useState } from 'react';
import { createMarketplaceAction } from '../actions/createMarketplace.action';
import { CreateMarketplaceRepository } from '@/src/core/driver/repository/madre/analitics/favorites/folders/create/CreateMarketplaceRepository';

export function useCreateMarketplace() {
  const [loading, setLoading] = useState(false);

  const createMarketplace = async (name: string) => {
    try {
      setLoading(true);

      const repository = new CreateMarketplaceRepository();
      return await createMarketplaceAction(repository, name);
    } finally {
      setLoading(false);
    }
  };

  return { createMarketplace, loading };
}