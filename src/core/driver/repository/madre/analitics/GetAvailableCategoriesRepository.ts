import { AvailableCategory } from "@/src/core/entitis/madre/analitics/AvailableCategory";
import { HttpClient } from "../../http/httpClient";
import { IGetAvailableCategoriesRepository } from "@/src/core/adapters/repository/madre/analitics/IGetAvailableCategoriesRepository";

export class GetAvailableCategoriesRepository
  implements IGetAvailableCategoriesRepository
{
  private readonly http: HttpClient;

  constructor(httpClient?: HttpClient) {
    this.http =
      httpClient ??
      new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_MADRE_API_URL!,
      });
  }

  async execute(): Promise<AvailableCategory[]> {
    return this.http.get<AvailableCategory[]>(
      "/api/analytics/categories/available"
    );
  }
}