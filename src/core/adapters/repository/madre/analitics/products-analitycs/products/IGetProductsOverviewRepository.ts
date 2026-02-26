import { ProductsFilters } from "@/src/core/entitis/madre/analitics/products-analitycs/ProductsFilters";
import { ProductsOverview } from "@/src/core/entitis/madre/analitics/products-analitycs/ProductsOverview";

export interface IGetProductsOverviewRepository {
  execute(filters: ProductsFilters): Promise<ProductsOverview>;
}