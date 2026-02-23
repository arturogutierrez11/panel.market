import { CategoryPerformance } from "@/src/core/entitis/madre/analitics/CategoryPerformance";

export interface IGetCategoriesPerformanceRepository {
  execute(params: {
    categoryId?: string;
    orderBy?: 'visits' | 'orders' | 'conversion' | 'revenue';
    direction?: 'asc' | 'desc';
  }): Promise<CategoryPerformance[]>;
}