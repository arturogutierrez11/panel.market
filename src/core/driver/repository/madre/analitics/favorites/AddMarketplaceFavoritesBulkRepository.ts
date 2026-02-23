import { IAddMarketplaceFavoritesBulkRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/IAddMarketplaceFavoritesBulkRepository";
import { HttpClient } from "../../../http/httpClient";

export class AddMarketplaceFavoritesBulkRepository
  implements IAddMarketplaceFavoritesBulkRepository
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
    marketplaceIds: number[];
    products: {
      productId: string;
      sellerSku: string;
    }[];
  }): Promise<void> {
    await this.http.post(
      `/api/analytics/marketplace-favorites/bulk`, 
      params
    );
  }
}