import { ProductsFilters } from "@/src/core/entitis/madre/analitics/products-analitycs/ProductsFilters";

export interface ISaveSegmentRepository {
  execute(
    marketplaceId: number,
    filters: ProductsFilters
  ): Promise<{
    success: boolean;
    segmentId: number;
    totalProducts: number;
  }>;
}