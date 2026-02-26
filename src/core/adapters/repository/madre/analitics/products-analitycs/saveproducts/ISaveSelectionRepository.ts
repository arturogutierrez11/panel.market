import { ProductsFilters } from "@/src/core/entitis/madre/analitics/products-analitycs/ProductsFilters";

export interface ISaveSelectionRepository {
  execute(
    marketplaceId: number,
    filters: ProductsFilters
  ): Promise<{
    success: boolean;
    totalProducts: number;
  }>;
}