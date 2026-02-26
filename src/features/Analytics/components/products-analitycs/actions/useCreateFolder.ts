'use client';

import { useState } from 'react';
import { ICreateMarketplaceRepository } from '@/src/core/adapters/repository/madre/analitics/favorites/folders/create/ICreateMarketplaceRepository';

export function useCreateFolder(
  repository: ICreateMarketplaceRepository
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (name: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!name.trim()) {
        throw new Error('El nombre no puede estar vacío');
      }

      return await repository.execute(name);

    } catch (err: any) {
      setError(err.message || 'Error al crear carpeta');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
}