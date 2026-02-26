import { Category } from "@/src/core/entitis/madre/analitics/products-analitycs/Category";

export interface IGetCategoriesRepository {
  execute(): Promise<Category[]>;
}