import { Category } from "@/src/core/entitis/madre/analitics/products-analitycs/Category";

export interface ISearchCategoriesRepository {
  execute(query: string): Promise<Category[]>;
}