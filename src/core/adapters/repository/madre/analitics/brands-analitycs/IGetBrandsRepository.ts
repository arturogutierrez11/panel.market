import { Brand, PaginatedBrands } from "@/src/core/entitis/madre/analitics/brands-analitycs/Brand";

export interface IGetBrandsRepository {
  getPaginated(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedBrands>;

  search(query: string): Promise<Brand[]>;
}