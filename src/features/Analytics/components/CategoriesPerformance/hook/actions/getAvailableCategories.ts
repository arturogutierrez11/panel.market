'use server';

import { IGetAvailableCategoriesRepository } from "@/src/core/adapters/repository/madre/analitics/IGetAvailableCategoriesRepository";
import { GetAvailableCategoriesRepository } from "@/src/core/driver/repository/madre/analitics/GetAvailableCategoriesRepository";
import { AvailableCategory } from "@/src/core/entitis/madre/analitics/AvailableCategory";


export async function getAvailableCategoriesAction(): Promise<AvailableCategory[]> {
  const repo: IGetAvailableCategoriesRepository =
    new GetAvailableCategoriesRepository();

  return repo.execute();
}