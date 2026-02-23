import { IGetCategoryProductsRepository } from "@/src/core/adapters/repository/madre/analitics/IGetCategoryProductsRepository";
import { CategoryProductsFilters, CategoryProductsResponse } from "@/src/core/driver/repository/madre/analitics/categoriesProducts/GetCategoryProductsRepository";


export class GetCategoryProducts {
  constructor(
    private readonly repository: IGetCategoryProductsRepository
  ) {}

  async execute(
    categoryId: string,
    page: number,
    limit: number,
    filters?: CategoryProductsFilters
  ): Promise<CategoryProductsResponse> {
    return this.repository.execute(
      categoryId,
      page,
      limit,
      filters
    );
  }
}