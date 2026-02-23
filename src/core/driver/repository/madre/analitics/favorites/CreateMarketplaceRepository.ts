import { ICreateMarketplaceRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/ICreateMarketplaceRepository";
import { HttpClient } from "../../../http/httpClient";

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

  async execute(name: string): Promise<void> {
    await this.http.post(
      `/api/analytics/marketplace-favorites/marketplaces`,
      { name }
    );
  }
}