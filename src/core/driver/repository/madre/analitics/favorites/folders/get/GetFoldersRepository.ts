import { IGetFoldersRepository } from "@/src/core/adapters/repository/madre/analitics/favorites/folders/get/IGetFoldersRepository";
import { HttpClient } from "@/src/core/driver/repository/http/httpClient";
import { Marketplace } from "@/src/core/entitis/madre/analitics/favorites/folder/status/marketplace.types";

export class GetFoldersRepository
  implements IGetFoldersRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(): Promise<Marketplace[]> {
    return this.http.get<Marketplace[]>(
      `/api/analytics/marketplace-favorites/marketplaces`
    );
  }
}