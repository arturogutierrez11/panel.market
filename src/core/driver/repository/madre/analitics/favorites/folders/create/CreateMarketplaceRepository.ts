import { ICreateMarketplaceRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/folders/create/ICreateMarketplaceRepository";
import { HttpClient } from "@/src/core/driver/repository/http/httpClient";

export class CreateMarketplaceRepository
  implements ICreateMarketplaceRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(name: string): Promise<{ success: boolean }> {
    return this.http.post(
      `/api/analytics/marketplace-favorites/marketplaces`,
      { name }
    );
  }
}