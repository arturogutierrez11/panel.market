'use server';

import { GetParentCategoriesPerformanceRepository } from "@/src/core/driver/repository/madre/analitics/getParentCategoriesPerformanceRepository";


export async function getParentCategoriesPerformanceAction() {
  const repo = new GetParentCategoriesPerformanceRepository();
  return repo.execute();
}