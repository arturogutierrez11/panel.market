import { IAddMarketplaceFavoriteRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/IAddMarketplaceFavoriteRepository";
import { HttpClient } from "../../../http/httpClient";

export class AddMarketplaceFavoriteRepository
  implements IAddMarketplaceFavoriteRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(
    marketplaceId: number,
    productId: string,
    sellerSku: string
  ): Promise<void> {
    await this.http.post(
      `/api/analytics/marketplace-favorites/${marketplaceId}/products/${productId}`,
      {
        sellerSku,
      }
    );
  }
}