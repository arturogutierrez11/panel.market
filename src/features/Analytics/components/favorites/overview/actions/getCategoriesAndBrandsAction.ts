'use server';

import { GetCategoriesAndBrandsRepository } from "@/src/core/driver/repository/madre/analitics/favorites/items/GetCategoriesAndBrandsRepository";

type QueryParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export async function getMarketplaceBrandsAction(
  marketplaceId: number,
  params?: QueryParams
) {
  const repository = new GetCategoriesAndBrandsRepository();

  return repository.getBrands(marketplaceId, params);
}

export async function getMarketplaceCategoriesAction(
  marketplaceId: number,
  params?: QueryParams
) {
  const repository = new GetCategoriesAndBrandsRepository();

  return repository.getCategories(marketplaceId, params);
}