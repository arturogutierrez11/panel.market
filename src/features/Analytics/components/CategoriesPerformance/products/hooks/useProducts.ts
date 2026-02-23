'use client';

import { useEffect, useState } from 'react';
import { GetProductsRepository } from '@/src/core/driver/repository/madre/analitics/products/GetProductsRepository';
import {
  GetProductsFilters,
  ProductsResponse,
} from '@/src/core/adapters/repository/madre/analitics/products/IGetProductsRepository';
import { GetProducts } from './actions/getProducts';

export function useProducts(filters: GetProductsFilters) {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const repository = new GetProductsRepository();
      const action = new GetProducts(repository);

      const response = await action.execute(filters);
      setData(response);
    } catch (err: any) {
      setError(err.message ?? 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(filters)]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}