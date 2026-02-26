import { AvailableCategory } from "@/src/core/entitis/madre/analitics/AvailableCategory";

export interface IGetAvailableCategoriesRepository {
  execute(): Promise<AvailableCategory[]>;
}