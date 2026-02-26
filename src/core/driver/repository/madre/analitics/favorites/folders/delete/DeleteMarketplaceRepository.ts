import { IDeleteMarketplaceRepository } from '@/src/core/adapters/repository/madre/analitics/favorites/folders/delete/IDeleteMarketplaceRepository';
import { HttpClient } from '@/src/core/driver/repository/http/httpClient';

export class DeleteMarketplaceRepository
  implements IDeleteMarketplaceRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(id: number): Promise<{ success: boolean }> {
    return this.http.delete(
      `/api/analytics/marketplace-favorites/marketplaces/${id}`
    );
  }
}