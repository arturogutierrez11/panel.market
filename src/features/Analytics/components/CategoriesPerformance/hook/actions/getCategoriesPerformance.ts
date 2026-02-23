'use server';

import { IGetCategoriesPerformanceRepository } from "@/src/core/adapters/repository/madre/analitics/IGetCategoriesPerformanceRepository";
import { GetCategoriesPerformanceRepository } from "@/src/core/driver/repository/madre/analitics/GetCategoriesPerformanceRepository";
import { CategoryPerformance } from "@/src/core/entitis/madre/analitics/CategoryPerformance";


type Params = {
  categoryId?: string;
  orderBy?: 'visits' | 'orders' | 'conversion' | 'revenue';
  direction?: 'asc' | 'desc';
};

export async function getCategoriesPerformanceAction(
  params: Params
): Promise<CategoryPerformance[]> {
  const repository: IGetCategoriesPerformanceRepository =
    new GetCategoriesPerformanceRepository();

  return repository.execute(params);
}