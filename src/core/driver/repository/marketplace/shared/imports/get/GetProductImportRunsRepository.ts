import { ProductImportRun } from "@/src/core/entitis/marketplace/shared/import/get/ProductImportRun";
import { HttpClient } from "../../../../http/httpClient";
import { PaginatedImportResult } from "@/src/core/entitis/marketplace/shared/import/paginated/PaginatedImportResult";
import { IGetProductImportRunsRepository } from "@/src/core/adapters/repository/marketplace/shared/import/get/IGetProductImportRunsRepository";

type ApiResponse = {
  items: ProductImportRun[];
  limit: number;
  offset: number;
};

export class GetProductSyncRunsRepository
  implements IGetProductImportRunsRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(params: {
    marketplace: string;
    offset: number;
    limit: number;
  }): Promise<PaginatedImportResult<ProductImportRun>> {
    const { marketplace, offset, limit } = params;

    const response = await this.http.get<ApiResponse>(
      `/api/internal/product-sync/runs?marketplace=${marketplace}&offset=${offset}&limit=${limit}`
    );

    return {
      items: response.items,
      limit: response.limit,
      offset: response.offset,
    };
  }
}