'use client';

import { useState } from 'react';
import { Category } from '@/src/core/entitis/madre/analitics/products-analitycs/Category';
import { ISearchCategoriesRepository } from '@/src/core/adapters/repository/madre/analitics/products-analitycs/categories/ISearchCategoriesRepository';

export function useSearchCategories(repository: ISearchCategoriesRepository) {
  const [results, setResults] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (query: string) => {
    if (!query) return;

    try {
      setLoading(true);
      const data = await repository.execute(query);
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    search
  };
}