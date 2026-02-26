'use server';

import { ISaveSegmentRepository } from '@/src/core/adapters/repository/madre/analitics/products-analitycs/segments/ISaveSegmentRepository';
import { SaveSegmentRepository } from '@/src/core/driver/repository/madre/analitics/products-analitycs/segments/SaveSegmentRepository';
import { ProductsFilters } from '@/src/core/entitis/madre/analitics/products-analitycs/ProductsFilters';

export async function saveSegmentAction(
  marketplaceId: number,
  filters: ProductsFilters
) {
  const repository: ISaveSegmentRepository =
    new SaveSegmentRepository();

  return repository.execute(marketplaceId, filters);
}