import { HttpClient } from "@/src/core/driver/repository/http/httpClient";

export class RemoveMarketplaceFavoritesBulkRepository {
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
    productIds: string[]
  ): Promise<void> {
    await this.http.delete(
      `/api/analytics/marketplace-favorites/${marketplaceId}/favorites`,
      { productIds }
    );
  }
}