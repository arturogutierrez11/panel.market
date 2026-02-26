'use server';

import { ISaveSelectionRepository } from '@/src/core/adapters/repository/madre/analitics/products-analitycs/saveproducts/ISaveSelectionRepository';
import { SaveSelectionRepository } from '@/src/core/driver/repository/madre/analitics/products-analitycs/saveProducts/SaveSelectionRepository';
import { ProductsFilters } from '@/src/core/entitis/madre/analitics/products-analitycs/ProductsFilters';

export async function saveSelectionAction(
  marketplaceId: number,
  filters: ProductsFilters
) {
  const repository: ISaveSelectionRepository =
    new SaveSelectionRepository();

  return repository.execute(marketplaceId, filters);
}