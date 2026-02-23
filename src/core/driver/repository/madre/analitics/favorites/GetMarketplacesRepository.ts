import { IGetMarketplacesRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/IGetMarketplacesRepository";
import { HttpClient } from "../../../http/httpClient";

export class GetMarketplacesRepository
  implements IGetMarketplacesRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(): Promise<
    { id: number; name: string }[]
  > {
    return this.http.get<
      { id: number; name: string }[]
    >(
      `/api/analytics/marketplace-favorites/marketplaces`
    );
  }
}