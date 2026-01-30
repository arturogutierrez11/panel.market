import { ProductImportRun } from "@/src/core/entitis/marketplace/shared/import/get/ProductImportRun";
import { PaginatedImportResult } from "@/src/core/entitis/marketplace/shared/import/paginated/PaginatedImportResult";

export interface IGetProductImportRunsRepository {
   execute(params: {
       marketplace: string;
       offset: number;
       limit: number;
     }): Promise<PaginatedImportResult<ProductImportRun>>
}