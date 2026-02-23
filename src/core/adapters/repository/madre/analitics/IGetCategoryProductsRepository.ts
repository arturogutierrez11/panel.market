import { CategoryProductsFilters, CategoryProductsResponse } from "@/src/core/driver/repository/madre/analitics/categoriesProducts/GetCategoryProductsRepository";


export interface IGetCategoryProductsRepository {
  execute(
    categoryId: string,
    page: number,
    limit: number,
    filters?: CategoryProductsFilters
  ): Promise<CategoryProductsResponse>;
}