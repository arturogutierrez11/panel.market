'use client';

import { useEffect, useState } from 'react';
import { Category } from '@/src/core/entitis/madre/analitics/products-analitycs/Category';
import { IGetCategoriesRepository } from '@/src/core/adapters/repository/madre/analitics/products-analitycs/categories/IGetCategoriesRepository';

export function useGetCategories(repository: IGetCategoriesRepository) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const data = await repository.execute();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    reload: load
  };
}