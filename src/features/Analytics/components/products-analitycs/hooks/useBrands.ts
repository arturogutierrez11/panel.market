'use client';

import { useState, useEffect, useCallback } from 'react';
import { IGetBrandsRepository } from '@/src/core/adapters/repository/madre/analitics/brands-analitycs/IGetBrandsRepository';
import { Brand } from '@/src/core/entitis/madre/analitics/brands-analitycs/Brand';

export function useBrands(repository: IGetBrandsRepository) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  /* ============================================================
     🔹 LOAD PAGINATED
     ============================================================ */

  const load = useCallback(
    async (nextPage: number = 1) => {
      try {
        setLoading(true);
        setError(null);

        const response = await repository.getPaginated({
          page: nextPage,
          limit: 20,
        });

        const items = response?.items ?? [];
        const totalPages = response?.meta?.totalPages ?? 1;

        setBrands(prev =>
          nextPage === 1 ? items : [...prev, ...items]
        );

        setPage(nextPage);
        setHasMore(nextPage < totalPages);

      } catch (err: any) {
       
        setError(err?.message ?? 'Error loading brands');
        setBrands([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [repository]
  );

  /* ============================================================
     🔹 SEARCH (usa endpoint simple)
     ============================================================ */

  const search = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        return load(1);
      }

      try {
        setLoading(true);
        setError(null);

        const results = await repository.search(query);

        setBrands(results ?? []);
        setHasMore(false); // search no es paginado

      } catch (err: any) {
        setError(err?.message ?? 'Error searching brands');
        setBrands([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [repository, load]
  );

  /* ============================================================
     🔹 INITIAL LOAD
     ============================================================ */

  useEffect(() => {
    load(1);
  }, [load]);

  /* ============================================================
     🔹 RETURN
     ============================================================ */

  return {
    brands,
    loading,
    error,
    hasMore,
    loadMore: () => {
      if (!loading && hasMore) {
        load(page + 1);
      }
    },
    search,
    reload: () => load(1),
  };
}