'use client';

import { IGetFoldersRepository } from '@/src/core/adapters/repository/madre/analitics/favorites/folders/get/IGetFoldersRepository';
import { Marketplace } from '@/src/core/entitis/madre/analitics/favorites/folder/status/marketplace.types';
import { useEffect, useState } from 'react';

export function useFolders(repository: IGetFoldersRepository) {
  const [folders, setFolders] = useState<Marketplace[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const data = await repository.execute();
      setFolders(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    folders,
    loading,
    reload: load,
  };
}